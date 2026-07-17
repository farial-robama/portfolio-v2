import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { leadCreateSchema } from "@/lib/validations/lead";
import { isRateLimited } from "@/lib/rate-limit";

// POST /api/leads — public. This is what the contact form submits to.
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: { message: "Too many submissions. Try again in a minute." } },
      { status: 429 },
    );
  }

  const body = await req.json();
  const parsed = leadCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  // Honeypot: a hidden field real visitors never fill in. Bots that
  // auto-fill every field will trip this. Pretend success so the bot
  // doesn't learn its submission was rejected.
  if (parsed.data.company) {
    return NextResponse.json({ data: { ok: true } }, { status: 201 });
  }

  const { company: _honeypot, ...leadData } = parsed.data;

  const lead = await prisma.lead.create({ data: leadData });

  // TODO: trigger an email notification to the owner here (e.g. via
  // Resend or a similar transactional email API) once you're ready —
  // the blueprint calls for this but it needs its own API key/setup.

  return NextResponse.json({ data: { id: lead.id } }, { status: 201 });
}

// GET /api/leads — admin only. Paginated inbox, newest first.
export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const status = searchParams.get("status") ?? undefined;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: status ? { status: status as never } : undefined,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where: status ? { status: status as never } : undefined }),
  ]);

  return NextResponse.json({
    data: leads,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}