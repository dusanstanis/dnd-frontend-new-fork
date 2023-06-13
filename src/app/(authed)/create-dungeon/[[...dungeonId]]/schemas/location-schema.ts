import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  mission: z.string().min(1, "Mission is required").min(5, "Mission must be at least 5 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  transition: z
    .string()
    .min(1, "Transition is required")
    .min(5, "Transition must be at least 5 characters"),
});

export type ILocationSchema = z.infer<typeof locationSchema>;
