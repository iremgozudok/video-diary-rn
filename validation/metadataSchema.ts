import * as z from "zod";

export const metadataSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be 200 characters or less"),
});

export type MetadataFormType = z.infer<typeof metadataSchema>;
