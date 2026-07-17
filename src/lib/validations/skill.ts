import { z } from "zod";

export const skillCategorySchema = z.object({
  name: z.string().min(1).max(60),
  sort: z.number().int().default(0),
});

export const skillSchema = z.object({
  categoryId: z.string().cuid(),
  name: z.string().min(1).max(60),
  proficiency: z.number().int().min(0).max(100),
  icon: z.string().max(60).optional(),
  descriptor: z.string().max(140).optional(),
  sort: z.number().int().default(0),
});

export type SkillCategoryInput = z.infer<typeof skillCategorySchema>;
export type SkillInput = z.infer<typeof skillSchema>;