# Ali Aqeel — Personal Portfolio

A responsive, editorial portfolio focused on data engineering, analytics, entrepreneurship, and training. Built from the supplied résumé using HTML5, CSS3, and vanilla JavaScript. No framework, package installation, backend, or build step is required.

## Features

- Default black/charcoal theme with silver accents and a saved, optional neutral-gray light theme.
- A subtle, tightly spaced gray background grid that remains static while scrolling.
- Glass-inspired surfaces with readable solid fallbacks and limited backdrop blur.
- Mobile navigation with Escape dismissal, destination focus, and active-section indicators.
- Responsive data-workflow and model-architecture illustrations made with CSS and inline SVG.
- Scroll reveals that respect reduced-motion preferences and remain readable without JavaScript.
- Résumé-based experience, technical skills, featured work, education, courses, and training.
- Accessible Forminit contact form with validation, loading states, and confirmed-success routing.
- Local assets, system typography, semantic HTML, social metadata, and relative paths.

## Structure

```text
Portfolio/
├── index.html                 # All professional content and semantic markup
├── css/
│   └── style.css              # Tokens, themes, layouts, illustrations, responsive rules
├── js/
│   ├── theme.js               # Small pre-render theme initializer
│   └── script.js              # Navigation, theme controls, reveals, Forminit submission
├── assets/
│   └── images/
│       └── favicon.svg        # Local vector monogram
├── docs/
│   ├── CONTENT_REVIEW.md      # Content provenance and outstanding review items
│   ├── VERIFICATION.md        # Completed checks and verification limitations
│   ├── previews/              # Local redesign review screenshots (not runtime assets)
│   └── PULL_REQUEST_DRAFT.md  # Prepared description for a future reviewed PR
├── .gitignore
├── .nojekyll
└── README.md
```

## Preview locally

Open `index.html` directly in a modern browser. The portfolio can be previewed without a server. Contact submission requires JavaScript, the remote Forminit SDK, network access, and an authorized hostname. Browsers can limit localStorage on `file://`; if unavailable, theme changes still work for the current visit.

For an HTTP preview, from the repository root run:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Stop the server with Ctrl+C. This server is only for local preview, not a production dependency.

## Update content

- Edit the corresponding semantic section in `index.html`. Content remains available if JavaScript is disabled.
- Add or edit skill badges using the existing `.tags` lists; no JavaScript changes are needed.
- Duplicate an experience or project article and update its heading, dates, description, and technologies. Keep the portfolio `h1`, section `h2`s, and article `h3`s; the alternate Thank You view has its own `h1`.
- Experience is sorted by start date, newest first. Some jobs and ventures overlap in the source résumé.
- Replace the project’s “Repository & demo not provided” text with real, verified links when supplied. Do not create placeholder links.
- Update the Tswer role after its November 2026 start is confirmed. It is intentionally marked **upcoming**, not current.
- Public GitHub and LinkedIn profile links were explicitly approved by the owner. Do not add an email, phone number, or other contact detail without approval.
- Edit CSS custom properties at the top of `css/style.css` to adjust the palette. Black is the default; the optional light palette uses `data-theme="light"`. An explicit saved choice is respected, including an existing visitor's light preference.
- All illustrations are conceptual, not screenshots of production dashboards. The 88.57% model accuracy is a résumé-reported result; it has not been independently benchmarked.
- The footer year updates automatically; update the static fallback in HTML if maintaining the site without JavaScript.

Keep the original résumé, extracted résumé text, credentials, and private source materials outside this repository. PDF and common local-secret paths are ignored as an additional safeguard.

## Visual effects and performance

The original content, section order, typography, and responsive layouts are retained. A black and graphite palette replaces the olive/lime styling, including the original data diagrams and favicon. Soft highlights and translucent surfaces create depth without adding external assets or dependencies.

The grid lives in one fixed, clipped viewport layer and uses a static 12px pattern at every viewport size. Its radial mask and the existing section surfaces preserve the intended fading, layering, and areas where the grid is hidden. The scroll listener remains only for the active navigation indicator and schedules one event-driven frame; it performs no grid style writes.

The hero's Data → Decision Journey illustration intentionally uses an independent 18px radial-dot pattern. It stays static and distinguishes the panel from the page grid.

Only the header and, on desktop, the hero illustration and contact form use backdrop blur. Repeated skill, venture, education, and training cards use translucent gradients and border highlights without blur. Unsupported backdrop filters fall back to solid readable surfaces. `prefers-reduced-transparency` also selects solid surfaces when supported by the browser.

`prefers-reduced-motion` disables smooth scrolling and keeps all content visible. The grid is always static and has no compositor hint or JavaScript transform. Preference changes during a visit are handled immediately. Without JavaScript, the dark design, grid, navigation, and content remain available.

The light toggle is retained for visitors who prefer a lighter reading surface, with muted neutral grays instead of harsh white sections. First-time visits use dark mode regardless of the operating-system theme; manual choices persist.

## GitHub Pages deployment

After reviewing and committing the changes:

1. Merge the approved branch into `main`.
2. Open the GitHub repository’s **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose `main` and `/ (root)`, then save.
5. Wait for GitHub’s Pages deployment to complete and use the URL shown in Settings.

For the current repository, the expected project URL is `https://aliaqeelonline.github.io/Portfolio/`. This is a deployment instruction, not a claim that the website is live. Relative styles, scripts, favicon, and section links support both that subpath and a custom domain. `.nojekyll` keeps the site static.

When a custom domain is selected, configure it through Pages settings and follow GitHub’s DNS instructions. Enable HTTPS once DNS and certificate provisioning are complete. Do not add a guessed `CNAME`.

The HTML includes a title, description, Open Graph title/description/type/locale, and Twitter card type. Add an absolute canonical URL and `og:url` once the production domain is confirmed. Add an absolute `og:image` URL and dimensions after creating an approved social preview image. No deployment URL or preview image is fabricated in metadata.

## Contact form: Forminit

The official browser SDK (`https://forminit.com/sdk/v1/forminit.js`) submits to form `6hl5q26g4zs` in Public mode without API keys. Required fields are `fi-sender-fullName`, `fi-sender-email`, and `fi-text-message`; `_gotcha` is the documented honeypot. Field IDs and the visual layout are retained. Errors preserve data; a confirmed response with a submission ID resets it. Pending requests disable resubmission. No automatic retries are performed.

The SDK's `redirectUrl` is accepted only when it exactly matches `https://aliaqeelonline.github.io/Portfolio/#thankyou`; otherwise that canonical destination is used after confirmed success. Direct fragment visits show a preview notice. A timestamp in sessionStorage (no personal data) retains confirmation across same-tab refreshes for 30 minutes; it is a UI convenience, not an authorization or backend record. If storage is unavailable, the current view still confirms success, while refresh returns to preview mode.

Manual dashboard setup (not changed by this task):

1. Set form authentication to **Public**.
2. Under **Form Settings → Redirections → Custom URL**, enter exactly `https://aliaqeelonline.github.io/Portfolio/#thankyou` and save.
3. Review authorized domains for `aliaqeelonline.github.io`.
4. If reCAPTCHA is still required, temporarily disable that requirement in Forminit before testing this integration. No Google library, token, site key, or CAPTCHA response field has been added. The Google Cloud key is untouched.
5. Retain Forminit spam protection and enable/configure its documented `_gotcha` honeypot if required by the dashboard.

Live delivery remains unverified: this branch is not deployed, dashboard/CAPTCHA settings are inaccessible, and no approved sender email was supplied. After deployment and configuration, send exactly one legitimate test through the actual form using an approved email, verify backend acceptance, the exact redirect, and the dashboard submission. Do not test from an unauthorized hostname or bypass CAPTCHA. The updated Thank You destination will work once this branch is deployed to Pages.

Official HTML, SDK, redirect, and honeypot guides were consulted. The requested `setup.md` could not be retrieved (HTTP 403/tool access error). See `docs/FORMINIT_VERIFICATION.md` for mocked test evidence and limitations.

## Review and verification

See `docs/CONTENT_REVIEW.md` for the extracted professional summary, content decisions, and missing information, and `docs/VERIFICATION.md` for the completed checks and their limitations. Desktop, tablet, and mobile redesign screenshots are indexed in [`docs/previews/README.md`](docs/previews/README.md). Changes are prepared on `portfolio-preview`; deployment and merging require separate approval. The original implementation's proposed pull-request description is in `docs/PULL_REQUEST_DRAFT.md`.

For a quick syntax check, if Node.js is available:

```sh
node --check js/theme.js
node --check js/script.js
git diff --check
```

Manual review should cover both themes, 320px mobile through large desktop widths, keyboard navigation, menu Escape behavior, anchor links, reduced motion, and form errors. Use mocked responses locally; live testing must use an authorized hostname and approved email. Check without JavaScript and by opening `index.html` directly. External venture websites may change independently and require owner review before publication.
