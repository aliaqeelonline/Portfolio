# Ali Aqeel — Personal Portfolio

A responsive, editorial portfolio focused on data engineering, analytics, entrepreneurship, and training. Built from the supplied résumé using HTML5, CSS3, and vanilla JavaScript. No framework, package installation, backend, or build step is required.

## Features

- Light and dark themes with saved preference and system-theme fallback.
- Mobile navigation with Escape dismissal, destination focus, and active-section indicators.
- Responsive data-workflow and model-architecture illustrations made with CSS and inline SVG.
- Scroll reveals that respect reduced-motion preferences and remain readable without JavaScript.
- Résumé-based experience, technical skills, featured work, education, courses, and training.
- Accessible contact-form preview with field validation and explicit non-delivery messaging.
- Local assets, system typography, semantic HTML, social metadata, and relative paths.

## Structure

```text
Portfolio/
├── index.html                 # All professional content and semantic markup
├── css/
│   └── style.css              # Tokens, themes, layouts, illustrations, responsive rules
├── js/
│   ├── theme.js               # Small pre-render theme initializer
│   └── script.js              # Navigation, theme controls, reveals, form preview
├── assets/
│   └── images/
│       └── favicon.svg        # Local vector monogram
├── docs/
│   ├── CONTENT_REVIEW.md      # Content provenance and outstanding review items
│   ├── VERIFICATION.md        # Completed checks and verification limitations
│   └── PULL_REQUEST_DRAFT.md  # Prepared description for a future reviewed PR
├── .gitignore
├── .nojekyll
└── README.md
```

## Preview locally

Open `index.html` directly in a modern browser. All site functionality works without a server or dependencies. Browsers can limit localStorage on `file://`; if unavailable, theme changes still work for the current visit.

For an HTTP preview, from the repository root run:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Stop the server with Ctrl+C. This server is only for local preview, not a production dependency.

## Update content

- Edit the corresponding semantic section in `index.html`. Content remains available if JavaScript is disabled.
- Add or edit skill badges using the existing `.tags` lists; no JavaScript changes are needed.
- Duplicate an experience or project article and update its heading, dates, description, and technologies. Keep the single main `h1`, section `h2`s, and article `h3`s.
- Experience is sorted by start date, newest first. Some jobs and ventures overlap in the source résumé.
- Replace the project’s “Repository & demo not provided” text with real, verified links when supplied. Do not create placeholder links.
- Update the Tswer role after its November 2026 start is confirmed. It is intentionally marked **upcoming**, not current.
- Public GitHub and LinkedIn profile links were explicitly approved by the owner. Do not add an email, phone number, or other contact detail without approval.
- Edit CSS custom properties at the top of `css/style.css` to adjust the palette. The dark-theme overrides use `data-theme="dark"`.
- All illustrations are conceptual, not screenshots of production dashboards. The 88.57% model accuracy is a résumé-reported result; it has not been independently benchmarked.
- The footer year updates automatically; update the static fallback in HTML if maintaining the site without JavaScript.

Keep the original résumé, extracted résumé text, credentials, and private source materials outside this repository. PDF and common local-secret paths are ignored as an additional safeguard.

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

## Contact form: intentionally inactive

There is no form endpoint, network submission, client-side message storage, email link, API key, Forminit SDK, or reCAPTCHA script. The **Send message — Not active yet** button validates the preview and states that nothing was sent or stored. It never displays a delivery-success message. Without JavaScript, the button stays disabled and the inactive notice remains visible.

The fields have stable IDs and names (`full-name` / `name`, `email`, `message`), proper labels, native validation attributes, per-field error containers, and a form status region. A future integration can preserve the layout.

In the separately authorized integration task:

1. Add the confirmed Forminit configuration and review its supported submission flow.
2. Add reCAPTCHA v3 using a public site key. Secret verification belongs with a trusted server/service, never GitHub Pages JavaScript.
3. Replace the preview handler in `js/script.js` with real submission handling, loading states, errors, and confirmed-success messaging. Update the button and inactive notices together.
4. Add appropriate privacy disclosures and keep private credentials out of the repository.

## Review and verification

See `docs/CONTENT_REVIEW.md` for the extracted professional summary, content decisions, and missing information, and `docs/VERIFICATION.md` for the completed checks and their limitations. Changes are intended for review before a commit or pull request, following the final task instruction. A proposed pull-request description is in `docs/PULL_REQUEST_DRAFT.md`.

For a quick syntax check, if Node.js is available:

```sh
node --check js/theme.js
node --check js/script.js
git diff --check
```

Manual review should cover both themes, 320px mobile through large desktop widths, keyboard navigation, menu Escape behavior, anchor links, reduced motion, and form errors. Verify that entering a valid message produces the inactive notice and no network request. Check without JavaScript and by opening `index.html` directly. External venture websites may change independently and require owner review before publication.
