# Resend Email Setup — tfctours

This guide covers everything needed to configure transactional email sending
for the three forms on tfctours.com.pk using Resend.

---

## 1. Create a Resend account

Go to https://resend.com and sign up.
The free tier sends 3,000 emails per month — sufficient for low-volume usage.

---

## 2. Verify your sending domain

1. In the Resend dashboard, go to **Domains** and click **Add Domain**.
2. Enter `tfctours.com.pk`.
3. Resend will provide DNS records (SPF, DKIM, DMARC). Add them to your
   domain registrar (e.g. Namecheap, Cloudflare, GoDaddy).
4. Click **Verify** in the Resend dashboard.
   Verification usually takes under 5 minutes.

> The `RESEND_FROM_EMAIL` address must use a domain that has passed
> verification. Sending from an unverified domain returns a 403 error and
> no email is delivered.

---

## 3. Create an API key

1. In the Resend dashboard, go to **API Keys** and click **Create API Key**.
2. Select **Sending access** only — never use Full Access in production.
3. Copy the key. It starts with `re_` and cannot be retrieved again after
   leaving the page.

---

## 4. Set environment variables

### Local development

Edit `.env.local` in the project root. Replace the placeholder values:

```env
RESEND_API_KEY=re_YOUR_REAL_KEY_HERE
RESEND_FROM_EMAIL=The Flight Centre <no-reply@tfctours.com.pk>
CONTACT_TO_EMAIL=info@tfctours.com.pk
QUOTATION_OWNER_EMAIL=info@tfctours.com.pk
```

> `.env.local` is listed in `.gitignore` and will never be committed.
> Use `.env.example` as a reference — it contains only placeholder values
> and is safe to commit.

### Vercel (production and preview)

1. Open your Vercel project dashboard.
2. Go to **Settings** then **Environment Variables**.
3. Add each variable below, selecting the **Production** environment
   (and optionally **Preview** for staging tests):

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key starting with `re_` |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `The Flight Centre <no-reply@tfctours.com.pk>` |
| `CONTACT_TO_EMAIL` | Inbox for contact form enquiries, e.g. `info@tfctours.com.pk` |
| `QUOTATION_OWNER_EMAIL` | Inbox for tour and umrah quotation emails, e.g. `info@tfctours.com.pk` |

4. Click **Save** and trigger a new deployment. Vercel loads environment
   variables at deploy time — existing deployments must be redeployed.

---

## 5. How each form sends email

| Form | Route | Emails sent |
|---|---|---|
| Contact Us | `/api/contact` | 1 email to `CONTACT_TO_EMAIL`; `replyTo` set to the submitter's address |
| Tour Package Quote | `/api/tour-quote` | 2 emails: detailed owner copy to `QUOTATION_OWNER_EMAIL` + customer confirmation to the submitter |
| Umrah Package Quote | `/api/umrah-quote` | 2 emails: detailed owner copy to `QUOTATION_OWNER_EMAIL` + customer "Assalamu Alaikum" confirmation to the submitter |

All three routes enforce a rate limit of **5 submissions per IP per minute**
(in-memory, resets on cold start). For production hardening, replace the
`ipHits` Map in each route with Vercel KV or Upstash Redis.

---

## 6. Smoke-test checklist

Run these tests manually after deploying to production or a preview URL.
Do not test only on localhost — Vercel environment variables must be live.

### Contact Us form
□ Open /contact and fill in all fields (name, phone, email, service, message).
□ Submit the form.
□ Confirm: form shows a success message.
□ Confirm: owner inbox (CONTACT_TO_EMAIL) receives an email with subject
"New website enquiry: {service} / {name}".
□ Confirm: the From address matches RESEND_FROM_EMAIL.
□ Confirm: replying to the email addresses the submitter, not the from address.
□ Confirm: no customer confirmation email is expected for the contact form.

### Tour Package Quote (tour-calculator)
□ Open /tour-calculator and complete all four steps.
□ Submit the quotation.
□ Confirm: success screen appears and displays a reference number (TFC-T-XXXXX)
with a tag icon (Lucide Tag — not an emoji).
□ Confirm: owner inbox (QUOTATION_OWNER_EMAIL) receives an email with subject
"Tour Quote — {name} | {adults}A {children}C | Ref: TFC-T-XXXXX"
containing hotel and flight tables.
□ Confirm: customer inbox receives a confirmation email with subject
"Your Tour Package Quotation — The Flight Centre | Ref: TFC-T-XXXXX".
□ Confirm: the reference number in both emails matches what the success screen shows.

### Umrah Package Quote (umrah-calculator)
□ Open /umrah-calculator and complete all six steps.
□ Submit the quotation.
□ Confirm: success screen appears and displays a reference number (TFC-XXXXX)
with a tag icon (Lucide Tag — not an emoji).
□ Confirm: owner inbox (QUOTATION_OWNER_EMAIL) receives an email with subject
"Umrah Quote — {name} | {adults}A {children}C {infants}I | Ref: TFC-XXXXX".
□ Confirm: customer inbox receives a confirmation email beginning
"Assalamu Alaikum, {name}," with the same reference number.
□ Confirm: the reference number in both emails matches the success screen.

### Rate limit test
□ Submit any form six times in under 60 seconds from the same IP.
□ Confirm: the sixth submission returns:
"Too many requests. Please wait a minute before trying again."
---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| "Email delivery is not configured" | `RESEND_API_KEY` is missing or empty | Add the variable in Vercel Settings and redeploy |
| Emails not arriving | Sending domain not verified in Resend | Verify `tfctours.com.pk` at https://resend.com/domains |
| From address rejected | Domain in `RESEND_FROM_EMAIL` differs from the verified domain | Update the variable to use the verified domain |
| Reference number missing from success screen | `referenceId` prop not wired in SuccessScreen | Run Prompt 4 or 5 of the Resend integration playbook |

---

*tfctours — Resend Setup Guide · The Flight Centre Travel & Tours*
