// src/lib/email/contact-template.ts
import { escapeHtml } from "@/lib/api-utils";
import { contactSchema } from "@/lib/schemas/contact";
import { emailHeader, emailWrapper } from "./chrome";

export function buildContactOwnerEmail(payload: ReturnType<typeof contactSchema.parse>) {
  const innerHtml = `
    ${emailHeader("New Website Enquiry - The Flight Centre")}
    <div style="padding:24px">
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
    </div>
  `;

  return emailWrapper(innerHtml, 700);
}
