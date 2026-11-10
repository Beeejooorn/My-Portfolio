# Portfolio Redesign — Design Specification

**Status:** Approved for Implementation — Installed in Repository

**Project:** Portfolio Redesign

**Purpose:** Define the approved visual design, content structure, interactions, and new animation requirements for implementing the portfolio from scratch.

## 1. Design Authority

The final user-approved four-page prototype is the primary visual and interaction reference.

The following sources govern development:

1. Most recent explicitly approved user decisions.
2. Final approved prototypes and responsive screenshots.
3. This specification, once approved.
4. Historical Master Checkpoint for decision context.

If requirements conflict or a necessary reference is unavailable, report the uncertainty rather than inventing a compromise.

Exact measurements, animation timing, and visual characteristics must be established using approved references and user-reviewed prototypes.

## 2. Visual Identity

The portfolio represents Bjorn Tanamal, a junior front-end developer based in the Philippines.

### Approved direction

- Modern and immersive.
- Minimal but impactful.
- Developer-first visual identity.
- Large, confident typography.
- Intentional whitespace and editorial composition.
- Light and dark visual moments.
- Seamless, purposeful motion.
- Clear navigation and user control.

### Typography and colors

- Archivo Black is the selected commanding hero typeface.
- Preserve the approved typographic hierarchy.
- Use the established warm-neutral/off-white and charcoal visual palette.
- Follow the approved About statement gradient.
- Use shared CSS design tokens.

Do not introduce generic marketing slogans, unrelated ornamentation, unnecessary cards, or visual effects inconsistent with the approved design.

## 3. Pages and Routes

The approved site contains four pages:

- Homepage — `/`
- Works — `/works`
- About — `/about`
- Contact — `/contact`

All four pages share the same design system, navigation, footer, and global transition language.

Direct visits, refreshes, internal navigation, and browser history navigation must work correctly.

Do not create additional public pages or case studies without authorization.

## 4. Shared Navigation

### Desktop

- Preserve one consistent navbar across all pages.
- Show it on initial load, at the top of the page, on route changes, and when the page cannot scroll.
- Hide during deliberate downward scrolling.
- Reveal during upward scrolling.
- Preserve approved layout, appearance, and transition character.
- Ensure every navigation destination works from every page.

### Mobile

- Preserve the three unequal-length, rounded hamburger strokes.
- Align the strokes by their right endpoints.
- Do not display a permanent square outline in the resting state.
- Animate the hamburger smoothly into a proportional X and back.
- Animate the dropdown opening and closing.
- Keep the navbar visible while the menu is open.
- Support Escape, keyboard navigation, focus management, and closing on route changes.
- Keep appropriate visible focus indicators and usable touch targets.

Do not replace this with generic mobile navigation or instant menu appearance.

## 5. Global Page Entrance and Route Transitions

**Status:** Smooth Reveal direction approved for prototype testing. Exact implementation and visual result pending review.

### Objective

Create a coherent sense of motion when visitors first open the website and when they navigate between its four pages.

The animation must complement the approved modern, immersive, minimal visual identity.

It must not behave like an artificial loading screen.

### Initial page load

- The navbar and meaningful page content must be available immediately.
- Introduce the primary page heading through a subtle opacity and vertical reveal.
- Supporting content may enter with restrained staggered timing.
- Preserve the approved layout throughout the animation.
- Do not add a loading percentage, countdown, unnecessary preloader, or full-screen transition panel.
- Do not cause visible content to shift unexpectedly after the animation completes.
- If JavaScript is unavailable or delayed, prerendered page content must remain accessible rather than being stuck invisible.

### Navigation between pages

- Use a brief, consistent transition between Homepage, Works, About, and Contact.
- The outgoing page may use a restrained exit animation.
- The incoming page should reveal smoothly.
- Preserve visual continuity of the shared navbar.
- Avoid full-screen cinematic wipes unless separately approved.
- Navigation must not be unnecessarily delayed to complete an animation.
- Prevent overlapping animations or broken interface states during rapid repeated navigation.
- Ensure browser back/forward navigation, keyboard focus, and scroll behavior remain correct.
- Route changes must remain understandable to assistive technology.

### Motion character

The initial direction is:

- Subtle fade-in.
- Small upward movement.
- Restrained typography stagger.
- Consistent easing.
- Smooth, lightweight transitions rather than dramatic effects.

An approximate 300–500ms entrance was suggested for experimentation, but **no exact duration or easing curve is approved yet**.

Codex must not treat those numbers as fixed specifications.

### Responsive behavior

- Desktop may use the full approved reveal character.
- Mobile should use shorter, lighter motion.
- Maintain the same identity across viewport sizes.
- Avoid animation-induced layout shifts or interaction delays.

### Reduced-motion and accessibility

- Respect the user's reduced-motion preference.
- Reduce or remove nonessential motion without changing the approved content structure or restoring the rejected alternate page layout.
- Ensure links, menus, forms, and other controls remain usable during and after transitions.
- Preserve focus visibility and readable page content.
- Never block the page if an animation fails.

### Implementation and acceptance

Use the approved Motion for React and CSS transition technologies.

Create one reusable global transition approach rather than unrelated custom animations for each page.

Before final acceptance, test:

- Initial direct page load.
- Navigation between all four pages.
- Browser back/forward.
- Rapid repeated navigation.
- Desktop and mobile behavior.
- Reduced-motion preferences.
- Keyboard accessibility and focus.
- Performance and unexpected layout shifts.

The animation's final feel must be reviewed and accepted by the user.

## 6. Homepage

### Hero

- Preserve the commanding `FRONTEND DEVELOPER` typography.
- Preserve the approved personal introduction, including the `I am Bjorn Tanamal` treatment.
- Maintain established hierarchy, spacing, composition, and responsive behavior.
- Do not add unapproved slogans, badges, or decorative elements.

The hero participates in the approved global page-entrance motion without changing its layout.

### Selected Work

On desktop:

- Preserve the large editorial project rows.
- Reveal an image preview during appropriate pointer interaction.
- Make the preview follow the cursor smoothly.
- Preserve continuity when switching projects.
- Retain the circular `View` interaction.
- Maintain correct destinations and usable click affordances.
- Preserve the established layout under normal and reduced-motion settings.

On touch devices:

- Use the approved large-title, touch-first project list.
- Do not depend on hover interactions.
- Make project destinations meaningfully tappable.
- Do not restore the rejected narrow, numbered fallback layout.

Project inclusion and ordering remain subject to content finalization.

### Homepage About

- Preserve the short editorial About introduction.
- Keep it distinct from the dedicated About page.
- Maintain a personal, factual, developer-first tone.
- Avoid generic inspirational copy and unnecessary skill badges.

### Closing Contact Area

- Preserve the established light editorial treatment shown in the approved final prototype.
- Keep `GET IN TOUCH ↗` prominent.
- Maintain the approved supporting copy and composition.
- Keep the arrow visually connected to the heading on narrow screens.
- Provide a functional action.

## 7. Works Page

### Desktop

- Preserve the large `WORKS` opening.
- Maintain the approved two-column gallery.
- Preserve project screenshots, titles, descriptions, and link hierarchy.
- Maintain interactive project tiles.
- Use subtle image-only zoom on hover.
- Do not scale entire cards or shift surrounding text.

### Mobile

- Use the approved single-column gallery.
- Preserve readable text, prominent imagery, and usable touch interactions.

### Closing section

- Preserve `Have a project in mind?`
- Preserve `Get in touch ↗`.
- Maintain the approved spacing and relationship with the shared footer.

Final project selection, order, imagery, destinations, and case-study availability must be verified separately.

Do not invent missing case-study pages.

## 8. About Page

### Introduction

- Use `ABOUT ME.`
- Do not restore `BEYOND THE CODE.`
- Preserve the open editorial layout.
- On desktop, position the approved portrait left and personal introduction right.
- Maintain the factual `Hi, I'm Bjorn.` introduction.
- Preserve the approved spacing, typography, and rules.
- Do not enclose the section in the previously rejected oversized dark rounded card.

### Résumé

Include `DOWNLOAD RÉSUMÉ ↗` after the second paragraph of the right-column introduction.

The link must provide the intended valid PDF document.

The final document content must be verified before launch.

### Confidence statement

Place the statement in a separate section below the completed introduction:

**Skills? I have them. I just need an opportunity to show it.**

- Preserve emphasis on the second sentence.
- Use the soft approved cream/taupe-to-charcoal gradient.
- Maintain contrast and readability.
- Keep the section independent from the introduction.
- Do not add stars, sparkles, glossy arcs, decorative curves, or generic badges.

### Responsive

Stack the portrait and introduction appropriately while preserving the separate confidence statement.

## 9. Contact Page

### Layout

- Preserve the warm-neutral, open editorial composition.
- Use the large `LET'S TALK.` heading.
- Maintain the approved desktop split between introduction and inquiry form.
- Stack content appropriately on smaller screens.
- Preserve intentional whitespace.
- Do not restore the rejected floating rounded-card layout on a dark background.

### Inquiry form

Preserve:

- Name field.
- Email field.
- Project category selection.
- Multiline project details.
- `Send inquiry ↗` action.
- Direct-email alternative.

Project categories:

- Website development.
- Website design.
- Collaboration.
- Other.

Keep the submission controls within the form, separate from the global footer.

### Delivery

Real email/API submission remains a separate development task.

Do not claim an inquiry has been sent unless actual delivery has been implemented and verified.

Submission provider, security controls, validation, abuse protection, and success/error handling require their own implementation and testing.

## 10. Shared Footer

Use one consistent footer across all four pages.

Preserve:

- `BJORN TANAMAL` identity.
- Gmail/Email, Instagram, Threads, and LinkedIn destinations.
- Recognizable platform icons and accessible labels.
- Approved dividers, alignment, and spacing.
- Balanced 2×2 social-link arrangement on mobile.

Do not reintroduce `Back to Top`, fabricated URLs, or unrelated decorative elements.

All destinations require verification.

## 11. Responsive Design

Use the following validation viewport widths:

- 320px.
- 390px.
- 768px.
- 1024px.
- 1440px.

These are test widths, not mandatory CSS breakpoints.

Maintain approved layout hierarchy at all sizes.

Avoid horizontal overflow, clipped content, inaccessible controls, excessive layout shifts, and broken responsive transitions.

## 12. Motion, Performance, and Accessibility

- Use Motion for React for complex interactions and CSS transitions for simpler effects.
- Preserve the approved component animations alongside the new global transition direction.
- Do not let global transitions interfere with navbar, Selected Work, gallery hover, or form interactions.
- Respect reduced-motion preferences without replacing the approved content structure.
- Maintain semantic markup, accessible labels, visible focus, keyboard controls, and sufficient contrast.
- Avoid animations that delay interaction or unnecessarily increase loading time.
- Supplement automated tests with visual and manual accessibility review.

## 13. Rejected and Superseded Approaches

Do not reintroduce:

- Decorative numbered section labels.
- `Back to Top` controls.
- The previous mobile Selected Work fallback.
- The rejected alternate reduced-motion layout.
- Generic inspirational slogans.
- `BEYOND THE CODE.`
- Oversized enclosed dark About cards.
- Stars, sparkles, and glossy decorative curves around the About statement.
- The rejected floating dark-canvas Contact layout.
- Unapproved navigation geometry.
- Instantly appearing mobile dropdowns.
- Old portfolio source code, components, styles, routing, or media assets.

The newly selected Smooth Reveal direction must not be silently replaced with a full-screen page wipe.

## 14. Reference Requirements

Before production implementation, make the following accessible to Codex:

1. Final approved desktop views of Homepage, Works, About, and Contact.
2. Final approved mobile views of all four pages.
3. Approved portrait and gradient references.
4. Mobile navbar open and closed states.
5. Selected Work cursor-follow interaction reference.
6. Works image-hover reference.
7. Correct résumé PDF and approved new-design media assets.
8. User-reviewed global page-transition prototype when available.

Do not assume historical localhost URLs or files from separate sessions are accessible to Codex.

Missing references must be reported, not fabricated.

## 15. Content and Prelaunch Items

Track the following separately from design approval:

- Final project selection and ordering.
- Project screenshots and destinations.
- Social and contact URLs.
- Remaining editorial placeholders.
- Final résumé contents, including replacement of `Portfolio: [Insert Portfolio Link]`.
- Real contact form delivery.
- Full About-gradient contrast verification.
- Spoken screen-reader verification.
- Production performance and deployment checks.
- Final review of global page-load and route-transition animations.

Do not invent missing content or claim deferred functionality is complete.

## 16. Acceptance Requirements

The final implementation must follow the approved design references and pass its relevant technical and visual checks.

The new global Smooth Reveal animation is approved only as a direction for prototype testing until the user accepts its actual behavior.

A passing build, screenshot comparison, or automated test does not independently establish user approval.

Codex must report completed technical work as **Implemented — Pending Review**.

Only explicit user acceptance establishes **Completed and Approved**.

Any deviation from approved design requires authorization.
