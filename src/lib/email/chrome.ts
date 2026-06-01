// src/lib/email/chrome.ts
// Shared header / footer for branded transactional emails.
import { BRAND } from "@/lib/constants";

export function emailHeader(title: string, subtitle?: string) {
  const subtitleHtml = subtitle
    ? `<p style="margin:6px 0 0;color:#fff;font-size:13px">${subtitle}</p>`
    : "";
  return `
    <div style="background:#cc0000;padding:16px 24px">
      <h2 style="margin:0;color:#fff;font-size:20px">${title}</h2>
      ${subtitleHtml}
    </div>
  `;
}

export function emailFooter() {
  return `
    <div style="padding:16px 24px;color:#666;font-size:12px">
      ${BRAND.companyName} · UAN: 111-786-788 · ${BRAND.email}
    </div>
  `;
}

export function emailWrapper(innerHtml: string, maxWidth = 900) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;background:#f5f5f5;padding:24px">
      <div style="max-width:${maxWidth}px;margin:0 auto;background:#fff;border:1px solid #ececec">
        ${innerHtml}
      </div>
    </div>
  `;
}

export function kvRowsHtml(rows: Array<[string, string]>) {
  return rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#f9f9f9" : "#ffffff"}">
        <td style="padding:12px 14px;font-weight:700;border:1px solid #ececec">${label}</td>
        <td style="padding:12px 14px;border:1px solid #ececec">${value}</td>
      </tr>
    `,
    )
    .join("");
}

export function pkr(n: number) {
  return `PKR ${n.toLocaleString("en-PK")}`;
}
