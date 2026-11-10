# Portfolio Redesign — Testing and Verification Protocol

**Status:** Approved for Implementation — Installed in Repository

**Project:** Portfolio Redesign

**Applies to:** All authorized Codex development tasks

## 1. Purpose

Define how Codex validates the new Portfolio Redesign implementation through automated testing, visual comparison, accessibility checks, and user review.

This document supports:

- **Loop A — Development:** Verify implementations, detect failures, repair defects, and retest.
- **Loop B — Continuous Learning:** Record reproducible technical findings and verified solutions for future tasks.

Testing must be reliable, proportionate to the task, and resource-efficient.

**A passing test does not automatically establish that an implementation matches the approved design.**

## 2. Testing Principles

1. Test against established acceptance criteria, not assumptions invented during implementation.
2. Use the approved `REDESIGN_SPEC.md` and final design references as the standard for visual and interaction behavior.
3. Select tests according to the scope and risk of the change.
4. Run focused tests during development and broader tests at integration milestones.
5. Never alter valid requirements or weaken tests to obtain a passing result.
6. Never report an unexecuted check as passed.
7. Preserve failed-test evidence until the issue has been investigated.
8. Stop when required checks pass, a blocking limitation is identified, or the repair limit is reached.

When evidence is incomplete, report the result as unverified rather than assuming success.

## 3. Approved Testing Technologies

Use the approved tools:

| Tool | Responsibility |
|---|---|
| TypeScript | Static type checking |
| ESLint | Code-quality and potential-defect checks |
| Prettier | Formatting consistency |
| Vitest | Unit tests |
| React Testing Library | Component behavior |
| Playwright | Browser interactions, navigation, responsive and visual tests |
| axe-core | Automated accessibility auditing |

The tools themselves require configuration during the authorized application-foundation milestone.

Do not assume that the old portfolio's testing configuration exists or is suitable for reuse.

## 4. Required Test Commands

During M1, establish and document consistent package scripts for:

- `typecheck`
- `lint`
- `format:check`
- `test:unit`
- `test:e2e`
- `build`

A separate accessibility command may be configured if useful.

The exact package scripts and underlying commands must be validated against the newly created application architecture.

Until M1 is complete, these are **required future script names, not claims about commands already available in the repository**.

Do not report a missing or unconfigured command as a successful test.

## 5. Risk-Based Test Selection

Use the smallest appropriate verification scope during each development iteration.

| Change type | Required testing focus |
|---|---|
| Content or minor styling | Relevant code checks, build where applicable, focused visual verification |
| New or changed React component | Type checking, linting, component tests and relevant rendering verification |
| Shared navigation | Routes, scrolling behavior, menu states, keyboard interaction and responsive testing |
| Cursor-follow interaction | Pointer movement, project switching, exit states, keyboard alternatives and visual behavior |
| Global transitions | Direct load, route changes, rapid navigation, reduced motion, focus and performance |
| Form behavior | Validation, interaction states, keyboard access and accurate delivery status |
| Routing or build configuration | All routes, prerendering, metadata, direct refresh and build verification |
| Shared architecture | Affected component tests and cross-page regression checks |
| Integration or release | Full required regression, accessibility, visual and deployment checks |

The matrix establishes minimum testing categories. Codex must expand coverage when the actual change introduces additional risk.

Do not run the entire browser suite after every minor adjustment unless shared behavior or significant regression risk justifies it.

## 6. Routing and Static Rendering Tests

The four authorized routes are:

- `/`
- `/works`
- `/about`
- `/contact`

Verify:

1. Each route renders the correct page.
2. Every route works when opened directly.
3. Refreshing any route does not produce an error.
4. Browser back and forward navigation function correctly.
5. Navbar links work from every page.
6. Unknown routes receive appropriate not-found handling.
7. Production builds generate the intended prerendered HTML.
8. Page-specific titles, descriptions, and other approved metadata appear correctly.
9. Important page content is represented in the generated HTML.
10. Browser hydration preserves functional interactions without introducing mismatches.

A successful client-side navigation test alone is insufficient to verify direct-route behavior.

## 7. Shared Navigation Testing

Test the shared navbar across all four pages.

### Desktop

Verify:

- Visible on initial load.
- Visible at the top of the page.
- Visible on pages without meaningful scrolling.
- Hides during deliberate downward scrolling.
- Reveals during upward scrolling.
- Remains correctly positioned during navigation.
- Links navigate to the intended routes.

### Mobile

Verify:

- Three unequal-length, right-aligned rounded strokes.
- Correct hamburger-to-X transformation.
- Smooth dropdown opening and closing.
- Correct open/closed accessible states.
- Keyboard and pointer activation.
- Escape-key closing.
- Appropriate focus restoration.
- Menu closing after navigation.
- Closed menu items are not focusable.
- Navigation remains usable during scrolling and transitions.

Compare the result against the approved visual references.

## 8. Global Page Animation Testing

The Smooth Reveal direction is approved for prototype testing, but its final timing and appearance remain subject to user approval.

Test:

1. First direct page load.
2. Navigation between each pair of authorized routes where relevant.
3. Browser back/forward.
4. Rapid repeated navigation.
5. Interrupted or overlapping transitions.
6. Mobile navigation during page transitions.
7. Reduced-motion preferences.
8. Keyboard focus after navigation.
9. Scroll position and expected scroll restoration.
10. Behavior when animation is unavailable or JavaScript is delayed.

Requirements:

- No artificial loading delay.
- No blocking overlay.
- No content permanently hidden by animation.
- No unintended page-layout changes.
- No broken browser history.
- No unapproved full-screen wipe.
- No replacement of the approved reduced-motion page structure.

Codex must provide an interactive preview for user evaluation of the final motion character.

Automated passing results do not establish approval of the animation's feel.

## 9. Page-Specific Testing

### Homepage

Verify:

- Approved hero structure and typography.
- Desktop Selected Work image previews.
- Smooth cursor-follow movement.
- Correct project-preview switching.
- Circular View interaction.
- Functional project destinations.
- Mobile touch-first project list.
- Homepage About section.
- Light closing Contact area.
- No obsolete numbered fallback layout.

### Works

Verify:

- Desktop two-column gallery.
- Mobile single-column gallery.
- Correct project image/title relationships.
- Image-only hover zoom.
- No surrounding card or text movement from the zoom effect.
- Accessible project destinations.
- Correct closing Contact action.

### About

Verify:

- `ABOUT ME.` heading.
- Approved portrait and introduction layout.
- Separate confidence-statement section.
- Approved gradient treatment.
- Valid résumé PDF behavior.
- Responsive composition.
- Required contrast and accessibility checks.

The final résumé's public-facing content must be reviewed separately.

### Contact

Verify:

- Approved editorial split layout.
- Responsive form layout.
- Name and email validation.
- Category selection.
- Project-details input.
- Keyboard and focus behavior.
- Accurate submit and error states.
- Functional direct-email alternative when its destination has been verified.

Until the contact backend has been implemented and tested, **the application must not claim successful message delivery**.

When real delivery is authorized, separately test server-side validation, secret handling, spam protection, failure handling, and actual delivery.

## 10. Responsive Testing

Use the approved reference widths:

| Width | Validation purpose |
|---|---|
| 320px | Small mobile |
| 390px | Standard mobile reference |
| 768px | Tablet reference |
| 1024px | Small desktop/tablet transition |
| 1440px | Desktop design reference |

These widths do not prescribe CSS breakpoints.

Check:

- Layout hierarchy.
- Text wrapping.
- Horizontal overflow.
- Interactive target accessibility.
- Image cropping and positioning.
- Shared navigation and footer.
- Responsive animation behavior.
- Content readability.
- Unexpected layout shifts.

During development, test affected widths first.

At cross-page integration, cover all four pages across all five widths. Additional viewport and real-device checks may be needed where emulation cannot establish actual behavior.

## 11. Visual Regression Protocol

Visual testing must distinguish three different types of evidence.

### A. Approved design reference

The user-approved visual or interactive prototype that defines the intended result.

### B. Implementation evidence

A screenshot or recording of Codex's actual implementation.

### C. Approved test baseline

A saved comparison reference accepted for future automated regression tests.

**Codex must never automatically approve its own implementation screenshot as a new baseline.**

### Comparison requirements

Review relevant:

- Typography and hierarchy.
- Positioning and spacing.
- Colors and backgrounds.
- Image dimensions and cropping.
- Responsive composition.
- Footer and navbar geometry.
- Visual states and interactive effects.

Where automated screenshot comparison is appropriate, stabilize the browser environment, fonts, viewport, and dynamic content before generating results.

A pixel difference is evidence for investigation, not automatically a design defect. Similarly, a matching screenshot does not prove an interaction behaves correctly.

When a baseline needs updating, document why and obtain the required user approval.

If an approved reference is unavailable, report the visual-fidelity check as incomplete.

Do not invent the missing reference.

## 12. Accessibility Verification

Use axe-core, browser tests, and appropriate manual checks.

Minimum relevant coverage:

- Semantic headings and landmarks.
- Accessible names and labels.
- Keyboard operation.
- Visible keyboard focus.
- Menu focus management.
- Form labels and validation feedback.
- Meaningful link text.
- Image alternatives.
- Color contrast.
- Reduced-motion preferences.
- Screen-reader compatibility.

Automated scanning does not establish complete accessibility.

In particular, final verification must include the previously identified About-gradient contrast concern and spoken screen-reader checks where feasible.

If manual checks cannot be performed, document that limitation explicitly.

Do not present browser accessibility-tree output as proof of real spoken announcements.

## 13. Performance and Runtime Stability

For interaction-heavy changes, verify:

- No significant unexpected layout shifts.
- No noticeable input blocking from animation.
- No unnecessary route-transition delay.
- No broken or missing assets.
- No avoidable runtime errors.
- No persistent animation or event-listener failures.
- Reasonable behavior on mobile-sized viewports.

Use appropriate browser diagnostics and performance measurements.

Do not invent performance scores or declare targets met without measuring them.

Formal performance budgets may be established after an initial implementation baseline is available and reviewed.

## 14. Repair and Retest Rules

Codex may perform up to **three repair cycles for the same underlying failure after the initial implementation**.

A repair cycle consists of:

1. Analyze the failure evidence.
2. Identify a plausible cause.
3. Apply a targeted correction.
4. Rerun the relevant verification.
5. Compare results.

The count does not reset when the same problem is renamed, split into smaller descriptions, or encountered through another test.

Do not repeatedly apply the same unsuccessful correction without new evidence.

When the limit is reached:

- Stop modifying the affected feature.
- Report the remaining failure.
- Include attempted corrections and actual test results.
- Mark the work as blocked or under revision.
- Request further direction.

Do not disable, weaken, or delete valid tests solely to obtain a passing result.

## 15. Test Results and Evidence

Use consistent outcomes:

| Result | Meaning |
|---|---|
| PASS | Test executed and met its criteria |
| FAIL | Test executed and did not meet its criteria |
| BLOCKED | Test could not complete due to a documented dependency or environment issue |
| NOT RUN | Test was not executed |
| NEEDS HUMAN REVIEW | Automated evidence is insufficient for acceptance |

Every task completion report should include:

- Task and test scope.
- Commands or procedures actually executed.
- Pass/fail outcomes.
- Relevant evidence or artifact references.
- Failures and limitations.
- Repair cycles consumed.
- Remaining risks.
- Whether visual or manual review is still needed.

Do not fabricate test results, screenshots, logs, scores, or browser outcomes.

Do not commit unnecessary large logs, videos, or screenshot collections. Preserve the relevant evidence needed for review and debugging.

## 16. Continuous Learning Integration

When testing reveals a meaningful reusable technical discovery, provide the information required by `docs/LESSONS_LEARNED.md`.

A technical lesson should not become Verified merely because a change appears to work once.

Verification should establish the relevant context, reproduction or evidence, corrective action, and successful applicable checks.

Codex should consult relevant Verified lessons before similar future tasks.

If a lesson fails under changed conditions, investigate and update its status.

Lessons may guide implementation but cannot override approved design or testing requirements.

## 17. GitHub Actions and Preview Verification

When authorized during project setup, configure GitHub Actions to run essential checks on relevant development changes.

The exact workflow must be defined after the new application scripts exist.

Appropriate CI checks include:

- Dependency installation from the new lockfile.
- Type checking.
- Linting.
- Formatting validation.
- Unit/component testing.
- Production build.
- Browser testing when appropriate.

A Vercel Preview Deployment may be used for visual and functional review.

Passing CI or generating a preview does not authorize a merge into the production branch.

The existing live website must remain protected until explicit release authorization.

## 18. Credit and Resource Efficiency

Follow `AGENTS.md` resource-efficiency requirements.

- Select tests by actual task impact.
- Prefer focused reruns after local corrections.
- Run comprehensive suites at relevant milestones.
- Avoid duplicate screenshots and unnecessary repeated browser sessions.
- Reuse valid evidence only when subsequent changes have not invalidated it.
- Investigate failures before consuming repair cycles.
- Do not use multiple agents or expensive testing workflows without a clear need.
- Stop testing once sufficient required evidence has been collected.

Never skip necessary correctness, accessibility, security, or release checks solely to reduce Codex credits.

## 19. Milestone Verification Gates

| Milestone | Required verification focus |
|---|---|
| M0 — Preparation | Repository safety, document availability, design-reference access |
| M1 — Foundation | Build, type checks, configured tests, routes and prerendering |
| M2 — Shared UI | Navbar, footer, keyboard and responsive behavior |
| M3 — Page transitions | Motion, navigation, accessibility, performance and user review |
| M4 — Homepage | Hero, Selected Work, mobile interactions and visual fidelity |
| M5 — Works | Gallery, hover behavior, links and visual fidelity |
| M6 — About | Layout, résumé PDF, gradient accessibility |
| M7 — Contact | Form usability, validation and honest delivery states |
| M8 — Integration | Cross-page functional, responsive, visual and accessibility regression |
| M9 — Prelaunch | Final content, contact delivery, SEO, accessibility, performance and release readiness |

Every milestone requires a report and an appropriate user review gate.

Passing required tests may establish **Implemented — Pending Review**.

Only the user's explicit acceptance may establish **Completed and Approved**.

## 20. Final Rule

The purpose of testing is to discover whether Codex has fulfilled the authorized requirements—not to produce a report that merely looks successful.

If evidence demonstrates a defect, Codex must investigate it within its authorized scope.

If evidence is missing, Codex must acknowledge the uncertainty.

If all required checks pass, Codex must stop and request the appropriate human review.

**Quality is demonstrated through evidence. Completion is established through user approval.**
