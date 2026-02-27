import * as z from "zod";

export const galleryValidation = z.object({
  file: z.custom<File[]>(),
  categoryId: z.string(),
  title: z.string().min(1, {message: "This field is required"}),
  // fb_url: z.string().url().optional(),
  // insta_url: z.string().url().optional()   ,
  fb_url: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: "Invalid URL",
    }),
  insta_url: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: "Invalid URL",
    }),
});

export const loginUserValidation = z.object({
  email: z.string().email().min(1, {message: "Email is required"}),
  password: z
    .string()
    .min(1, {message: "Password is required"})
    .min(8, {message: "Password must be 8 characters long"}),
});
