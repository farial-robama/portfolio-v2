import { z } from "zod";

// Public-facing — this is what the contact form submits.
export const leadCreateSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  source: z.string().max(60).optional(),
  // Honeypot field: real users never fill this in (it's visually
  // hidden). If it has a value, silently drop the submission.
  company: z.string().max(0).optional(),
});

// Admin-only — changing status from the inbox.
export const leadUpdateSchema = z.object({
  status: z.enum(["UNREAD", "READ", "STARRED", "ARCHIVED"]),
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;