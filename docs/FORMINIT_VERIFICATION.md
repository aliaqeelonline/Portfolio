# Forminit contact form verification

## reCAPTCHA v3 integration

- The first valid submission loads the Google script using the public site key. The form waits for readiness and then requests a fresh `contact_form` token on every attempt. Readiness and token generation each have a ten-second timeout.
- The existing Public-mode SDK sends the name, email, message, `_gotcha` honeypot, and `g-recaptcha-response` to Forminit form `6hl5q26g4zs`. Forminit verifies the token server-side after its CAPTCHA setting is configured.
- If the security check fails or times out, the form retains the visitor's input, restores the submit control, and shows a retry message. Forminit rejections, expiration, and network failures also preserve the input.
- The form resets and redirects to `https://aliaqeel.com/#thankyou` only after Forminit returns a submission ID. A direct visit shows the preview unless this tab recorded a recent confirmation. The timestamp is a UI state and contains no message data.
- Google's visible attribution and policy links sit under the contact form controls. The floating badge is hidden to avoid covering controls on small screens.

## Automated verification

Fourteen Chromium scenarios passed using the published Forminit browser SDK (npm `forminit` 0.2.4), with Google reCAPTCHA simulated and Forminit HTTP requests intercepted. The tests covered validation, SDK payload and honeypot, duplicate suppression, new tokens on retries, missing and malformed tokens, readiness and execution timeouts, blocked scripts, Forminit rejections, expiration, network failure, input preservation, confirmed reset, custom-domain redirect, and direct preview behavior. Both themes were tested at 320, 390, 768, and 1440 pixels.

The cloud network returned HTTP 403 for the live Google script. Real token issuance, deployed SDK behavior, server-side enforcement, and production delivery remain unverified. No live messages were sent and no dashboard settings were changed.

## Production configuration and verification

1. In Google Cloud, confirm that the existing score-based website key authorizes `aliaqeel.com`. In the key's **Integration** tab, choose **Use legacy key** to get the Legacy Secret Key.
2. In Forminit, open form `6hl5q26g4zs`. Keep authentication **Public**, verify `aliaqeel.com` in authorized domains if domain restrictions are enabled, and retain the existing spam protection and honeypot settings.
3. In **Form Settings → CAPTCHA**, choose **reCAPTCHA v3**, enter the Legacy Secret Key there, and save.
4. In **Form Settings → Redirections → Custom URL**, enter `https://aliaqeel.com/#thankyou` and save.
5. After deployment, verify production with an approved real submission. Confirm acceptance, the exact Thank You URL, and dashboard receipt. Confirm CAPTCHA enforcement separately through an authorized negative test that verifies a missing or invalid token is rejected.

[Forminit reCAPTCHA setup](https://forminit.com/docs/recaptcha/) · [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) · [Google branding guidance](https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge-what-is-allowed)
