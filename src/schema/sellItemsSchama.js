import { z } from "zod";

export const sellItemSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be less than 20"),
  category: z.string().min(1, "Category is required"),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Price must be a positive number",
    })
    .transform((value) => parseFloat(value)),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be less than 200"),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Image is required")
    .transform(files => files[0])
});