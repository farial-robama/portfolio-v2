import { z } from "zod";

export const experiencePointSchema = z.object({
  text: z.string().min(1).max(280),
  sort: z.number().int().default(0),
});

export const experienceSchema = z
  .object({
    company: z.string().min(1).max(120),
    role: z.string().min(1).max(120),
    location: z.string().max(120).optional(),
    logoMediaId: z.string().cuid().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().default(false),
    sort: z.number().int().default(0),
    points: z.array(experiencePointSchema).min(1),
  })
  .refine((data) => data.isCurrent || data.endDate, {
    message: "endDate is required unless isCurrent is true",
    path: ["endDate"],
  });

export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ExperiencePointInput = z.infer<typeof experiencePointSchema>;