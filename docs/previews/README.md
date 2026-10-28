## October 28: Forminit and interaction refinement

- [Desktop header](header-1440.png), [tablet header](header-768.png), [mobile header](header-390.png)
- [Desktop contact](contact-1440.png), [tablet contact](contact-768.png), [mobile contact](contact-390.png)
- [Simulated confirmed Thank You](thankyou-desktop.png)
- [Desktop preview](thankyou-1440.png), [tablet preview](thankyou-768.png), [mobile preview](thankyou-390.png), [light preview](thankyou-light.png)

All submissions in verification were mocked. Older screenshots below document earlier versions, including now-removed card hover effects.

# Black / glass redesign previews

Captured from the local implementation in Chromium on October 22, 2026. These are review images, not website runtime assets. The site content and structure are preserved; black is the default and neutral light mode remains optional.

| Preview | Viewport |
| --- | --- |
| [Desktop — black](desktop.png) | 1440 × 1000 |
| [Desktop — skills](desktop-skills.png) | 1440 × 1000 |
| [Desktop — projects](desktop-projects.png) | 1440 × 1000 |
| [Desktop — contact](desktop-contact.png) | 1440 × 1000 |
| [Desktop — optional light theme](desktop-light.png) | 1440 × 1000 |
| [Tablet](tablet.png) | 768 × 1024 |
| [Mobile](mobile.png) | 390 × 844 |
| [Mobile — navigation](mobile-menu.png) | 390 × 844 |
| [Mobile — contact validation preview](mobile-contact.png) | 390 × 844 |

## Targeted interaction fixes

| Preview | Purpose |
| --- | --- |
| [Hero dotted panel](hero-dotted-panel.png) | Restored static gray dots inside Data → Decision Journey |
| [Deep Learning hover](deep-learning-hover.png) | Full project panel with the shared hover border, shadow, and lift |
| [Static grid — desktop](grid-static-desktop.png) | Fixed 12px page grid at 1440 × 1000 |
| [Static grid — tablet](grid-static-tablet.png) | Fixed 12px page grid at 768 × 1024 |
| [Static grid — mobile](grid-static-mobile.png) | Fixed 12px page grid at 390 × 844 |
| [Grid — top reference](grid-top-contracted.png) | Previous contracted-state reference |
| [Grid — quarter reference](grid-quarter-expanded.png) | Previous animated-state verification |
| [Grid — middle reference](grid-middle-contracted.png) | Previous contracted-state reference |
| [Grid — three-quarter reference](grid-three-quarter-expanded.png) | Previous animated-state verification |
| [Grid — bottom reference](grid-bottom-contracted.png) | Previous contracted-state reference |
| [Tablet projects](fix-tablet-projects.png) | Updated 768 × 1024 layout |
| [Mobile hero](fix-mobile-hero.png) | Updated 390 × 844 layout |

The mobile contact image contains test input entered during verification; the form does not send or store it. The archived grid-position series documents the earlier animated implementation. The current page uses a fixed 12px grid at every scroll position and viewport size.

![Black desktop portfolio with gray grid and charcoal glass panels](desktop.png)

![Mobile portfolio retaining the same black and glass visual identity](mobile.png)
