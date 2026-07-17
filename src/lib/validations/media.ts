import { z } from "zod";

// Client asks for a signature before uploading directly to Cloudinary.
export const uploadSignRequestSchema = z.object({
  folder: z.string().max(60).default("portfolio"),
});

// After the direct upload succeeds, the client sends back what
// Cloudinary returned so we can store a reference row.
export const mediaCreateSchema = z.object({
  provider: z.enum(["cloudinary", "s3"]).default("cloudinary"),
  key: z.string().min(1), // public_id / object key
  url: z.string().url(),
  type: z.enum(["IMAGE", "VIDEO"]),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  variantsJson: z.record(z.any()).optional(),
});

export type UploadSignRequest = z.infer<typeof uploadSignRequestSchema>;
export type MediaCreateInput = z.infer<typeof mediaCreateSchema>;