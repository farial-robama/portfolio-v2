import { z } from "zod";

export const projectMetricSchema = z.object({
  label: z.string().min(1).max(60),
  value: z.string().min(1).max(30),
  unit: z.string().max(20).optional(),
  sort: z.number().int().default(0),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase, hyphen-separated"),
  title: z.string().min(1).max(120),
  category: z.string().max(60).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
  // Structured content — a plain string for now (upgrade path: swap
  // this for Tiptap's JSON output once the rich-text editor is wired
  // into the admin UI; the API/DB shape doesn't need to change).
  bodyJson: z.union([z.string(), z.record(z.any())]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishAt: z.coerce.date().optional(),
  sort: z.number().int().default(0),
  toolNames: z.array(z.string().min(1)).default([]),
  metrics: z.array(projectMetricSchema).default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectMetricInput = z.infer<typeof projectMetricSchema>;