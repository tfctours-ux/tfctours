// src/lib/schemas/contact.ts
import { z } from "zod";

export const contactSchema = z
  .object({
    name:    z.string().trim().min(2, "Please enter your full name."),
    phone:   z.string().trim().min(7, "Please enter a valid phone number."),
    email:   z.string().trim().email("Please enter a valid email address."),
    service: z.string().trim().min(2, "Please select the required service."),
    message: z.string().trim().min(10, "Please add a short message with your travel or visa requirement."),
    turnstileToken: z.string().min(1, "Please complete the security check."),
  })
  .strict();

export type ContactPayload = z.infer<typeof contactSchema>;
