# Contact and interaction update — October 28, 2026

Current verification supersedes the earlier inactive-form and card-hover notes in VERIFICATION.md. Tests ran in Chromium; physical-device and Safari/Firefox testing remain outstanding.

## Implementation

- Header opacity is 68% dark / 72% light, retaining 16px blur and solid accessibility/unsupported-browser fallbacks.
- Active Rilo Data and Tswer responsibilities use present-tense wording. Tswer retains its verified November 2026 date without implying that workshops have already been delivered.
- Only button-styled controls have hover rules, using shadows without moving hit areas or switching gradient layers. Keyboard focus and entrance transitions remain.
- Forminit Public SDK integration uses form 6hl5q26g4zs, full-name/email/message sender fields and the documented `_gotcha` field. No private key or reCAPTCHA integration.
- Confirmed submission ID required before reset/redirect. The SDK destination is allowlisted to the exact portfolio `#thankyou` URL, with that same URL as fallback.
- Direct Thank You visits are previews. Same-tab refresh can retain a confirmed state for 30 minutes using only a timestamp, never message contents. The UI marker is not an authoritative backend receipt.

## Automated verification

48 browser assertions passed: required fields and focus, payload names, rejection and network failures, malformed success, preserved input, pending/busy states, duplicate suppression, success-only reset, redirect fallback, direct fragment/refresh/return, hover stability, menu/Escape focus, theme and reduced motion, zero horizontal overflow at 320/390/768/1440px, static 12px grid, and no JavaScript exceptions.

Five additional cases used the actual published `forminit` npm SDK 0.2.4 with intercepted HTTP responses: success, CAPTCHA rejection, network failure, malformed response, and missing SDK. All passed. The production CDN script could not be fetched in this environment; these tests verify the published SDK contract, not CDN availability.

**Zero real submissions were sent.** The canonical hostname in the browser tests was simulated by request interception; it was not used to bypass hostname restrictions. Test-only `.invalid` email addresses never reached Forminit. Live delivery, dashboard presence, current authentication/CAPTCHA settings, and live redirect remain unverified.

## Before the one live test

In Forminit, select form 6hl5q26g4zs:

1. Set authentication to Public.
2. Form Settings → Redirections → Custom URL: `https://aliaqeelonline.github.io/Portfolio/#thankyou`.
3. Confirm the authorized hostname `aliaqeelonline.github.io`.
4. If the existing reCAPTCHA requirement is enabled, temporarily disable it in Forminit. Do not bypass it or alter/delete the Google Cloud key.
5. Retain built-in spam protection and configure the documented honeypot as needed.

After separately approved deployment, send exactly one test using an approved sender email, verify the successful backend response, exact fragment destination and dashboard receipt. The updated destination requires this version to be deployed. No dashboard settings were changed by this task.

Sources: official HTML, SDK, redirections and honeypot documentation. `https://forminit.com/setup.md` was attempted first but unavailable (HTTP 403 / browser-tool access error).

Screenshots in `docs/previews`: `header-{1440,768,390}.png`, `contact-{1440,768,390}.png`, `thankyou-{1440,768,390}.png`, `thankyou-desktop.png` (simulated confirmed success), and `thankyou-light.png`. Other Thank You screenshots show preview mode.
