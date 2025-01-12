import { z } from "zod";

export const txSchema = z.object({
  createdAt: z.string(),
  chain: z.string(),
  txHash: z.string(),
  rating: z.number(),
});

export const aiShortBoxSchema = z.object({
  aiBoxId: z.string(),
  name: z.string(),
  startDate: z.number(),
  endDate: z.number(),
  verifiable: z.boolean(),
});

export const aiShortBoxesSchema = z.object({
  boxes: z.array(aiShortBoxSchema),
  total: z.number(),
});

export const aiBoxSchema = z.object({
  aiBoxId: z.string(),
  name: z.string().nullable().optional(),
  epoch: z.number(),
  startDate: z.number(),
  endDate: z.number(),
  prize: z.number(),
  prizeToken: z.string(),
  query: z.string(),
  handicap: z.string(),
  prompt: z.string().nullable(),
  oraQuery: z.string().nullable(),
  aiJudgeQueryTxHash: z.string().nullable(),
  rating: z.number(),
  transactions: z.array(txSchema),
  verifiable: z.boolean(),
});

export const aiBoxViewPromptSchema = z.object({
  aiBoxId: z.string(),
  userId: z.string(),
  prompt: z.string(),
  question: z.string(),
});

export const aiBoxPromptSchema = z.object({
  prompt: z.string(),
  oraQuery: z.string(),
});

export type IAiBox = z.infer<typeof aiBoxSchema>;
