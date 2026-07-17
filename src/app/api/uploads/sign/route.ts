import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { signUpload } from "@/lib/cloudinary";
import { uploadSignRequestSchema } from "@/lib/validations/media";

// POST /api/uploads/sign — admin only. The browser calls this first,
// gets back a signature, then uploads the actual file straight to
// Cloudinary using that signature. The file itself never hits this
// server — only the small JSON signature request does.
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = uploadSignRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const signed = signUpload(parsed.data.folder);
  return NextResponse.json({ data: signed });
}