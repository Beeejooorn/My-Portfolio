# Portfolio Redesign — Implementation Plan

**Status:** Approved for Implementation — Installed in Repository

**Project:** Portfolio Redesign

**Repository:** Beeejooorn/My-Portfolio

**Execution:** Codex

**Planning and design approvals:** ChatGPT brainstorming conversation and user

## 1. Objective

Implement the approved four-page portfolio redesign from fresh production code within the existing GitHub repository.

Follow the approved `AGENTS.md` governance rules and `docs/REDESIGN_SPEC.md`.

Development must use the approved two-loop architecture:

- **Loop A — Development:** Plan, implement, verify, diagnose, repair and retest.
- **Loop B — Learning:** Capture, verify, classify, reuse, revalidate and protect technical lessons.

Prioritize correctness, visual fidelity, accessibility, performance, human oversight and efficient resource usage.

The existing portfolio's code, styling, components, routing, architecture and media assets must not be reused. Only verified legacy URLs may be transferred.

## 2. Execution Authority

Approval of this implementation plan does not authorize Codex to begin every milestone automatically.

Each development task must have an established scope and authorization.

Codex may execute the approved task and correct technical defects within the three-repair-cycle limit.

It must not independently:

- Start the next milestone.
- Change approved design requirements.
- Expand the feature scope.
- Introduce major unapproved dependencies.
- Rewrite governance rules.
- Merge into the production branch.
- Deploy to the live website.

At the end of each milestone, Codex must stop and submit its results for user review.

## 3. Implementation Status Definitions

Use these statuses consistently:

| Status | Meaning |
|---|---|
| Proposed | Not yet approved |
| Approved for Implementation | Requirements accepted; execution may begin when authorized |
| Implemented — Pending Review | Work completed technically but not user-accepted |
| Testing / Revision | Defects or improvements require evaluation |
| Completed and Approved | User has explicitly accepted the result |
| Rejected / Superseded | Approach replaced, with reason recorded |

Never infer user approval from passing automated checks or successful deployment.

## 4. Development Milestones

### M0 — Project Preparation and Reference Transfer

**Initial status:** Approved requirements; execution not started.

**Objective:** Establish a safe development environment and make the approved design accessible to Codex.

Tasks:

1. Confirm the GitHub repository, production branch and current working-tree state.
2. Create a separate redesign branch when authorized.
3. Preserve the existing production website and repository history.
4. Add the five finalized and approved Markdown documents.
5. Organize approved desktop/mobile screenshots and interaction references.
6. Make the approved new-design media assets and résumé document available where appropriate.
7. Identify missing design references, unresolved content and unavailable files.
8. Confirm that Codex can access the materials it needs.

**Acceptance criteria:**

- Approved Markdown files exist in the correct locations.
- Repository and branch safety have been verified.
- Design references are available or explicitly identified as missing.
- No production site or existing live branch has been modified.
- No old portfolio source code or media is designated for reuse.

**Gate:** User reviews the preparation results before application development.

### M1 — Fresh Application Foundation

**Objective:** Establish the new application architecture without reusing legacy implementation.

Tasks:

1. Configure the approved React, Vite and TypeScript foundation.
2. Configure React Router Framework Mode.
3. Establish static prerendering for the four approved routes.
4. Set up CSS Modules and shared design tokens.
5. Configure Motion for React.
6. Configure the approved code-quality and testing tools.
7. Establish accessible application entry points and route structure.
8. Configure appropriate build and development scripts.

All new implementation must be authored from scratch.

Existing legacy source may be removed or replaced only within the authorized redesign branch and after repository safety checks.

**Acceptance criteria:**

- The application builds successfully.
- Type checking and code-quality checks work.
- All four routes can be visited directly.
- Static HTML is generated as intended.
- Tests can be executed.
- No legacy implementation was copied.
- The existing live website remains unaffected.

**Gate:** Technical foundation reviewed before detailed UI work.

### M2 — Shared Design System and Navigation

**Objective:** Implement the reusable visual foundation shared by all pages.

Tasks:

1. Establish typography, colors, layout widths, spacing and motion tokens from approved references.
2. Implement the desktop navbar.
3. Implement the mobile hamburger/X and animated dropdown.
4. Implement hide-on-downscroll and reveal-on-upscroll behavior.
5. Implement the shared branded social footer.
6. Implement accessible navigation and responsive behavior.

**Acceptance criteria:**

- Global styling matches approved design references.
- Desktop and mobile navigation operate correctly.
- Navigation works across all four routes.
- Keyboard, Escape, focus and menu state behavior pass relevant checks.
- Mobile footer preserves the approved 2×2 layout.
- No decorative numbered labels or Back to Top controls appear.

**Gate:** User review of shared components.

### M3 — Global Page Entrance and Route Transitions

**Objective:** Prototype the approved Smooth Reveal direction.

Tasks:

1. Implement a restrained first-load page entrance.
2. Implement coordinated route-entry and optional route-exit motion.
3. Maintain stable shared navigation during transitions.
4. Handle rapid navigation, browser history and scroll behavior.
5. Respect reduced-motion preferences.
6. Test accessibility and performance.

**Acceptance criteria:**

- Content remains usable without animation.
- Page entrances do not cause significant unexpected layout shifts.
- Navigation does not become blocked.
- No artificial loader or unapproved full-screen wipe is introduced.
- All four routes retain correct functionality.
- The user can evaluate the actual motion in an interactive preview.

**Gate:** User reviews and approves the final animation behavior. A successful technical test alone does not finalize its timing or feel.

### M4 — Homepage

**Objective:** Implement the approved Homepage.

Suggested task sequence:

1. Hero composition and oversized typography.
2. Selected Work static layout and data presentation.
3. Desktop cursor-follow preview and circular View interaction.
4. Mobile touch-first Selected Work presentation.
5. Homepage About section.
6. Light closing Contact area.
7. Responsive and interaction verification.

**Acceptance criteria:**

- Layout and typography match approved references.
- Desktop project previews follow pointer interaction smoothly.
- Project switching does not produce broken preview states.
- Touch devices have accessible project destinations.
- Shared navigation and global transitions remain functional.
- No rejected fallback presentation reappears.

**Gate:** User reviews the Homepage before it is considered complete.

### M5 — Works Page

**Objective:** Implement the approved project gallery.

Tasks:

1. Large Works heading and opening composition.
2. Desktop two-column gallery.
3. Project image, title, description and destination presentation.
4. Subtle image-only hover zoom.
5. Single-column mobile gallery.
6. Closing contact invitation.
7. Responsive and interaction verification.

**Acceptance criteria:**

- Gallery matches approved desktop and mobile references.
- Images zoom without moving their surrounding card content.
- Verified links work.
- Unavailable case studies are not invented.
- Shared design and transitions remain consistent.

**Gate:** User reviews and approves the Works implementation.

### M6 — About Page

**Objective:** Implement the approved About page.

Tasks:

1. `ABOUT ME.` heading and editorial layout.
2. Approved portrait and personal introduction.
3. Typographic résumé-download link.
4. Separate confidence-statement section.
5. Approved gradient treatment.
6. Responsive layout and accessibility testing.

**Acceptance criteria:**

- Portrait/intro hierarchy matches references.
- Confidence statement is a separate section.
- No rejected decorative effects appear.
- Résumé link provides a valid PDF.
- Gradient text satisfies required contrast checks.
- Responsive and keyboard behavior pass relevant checks.

**Gate:** User reviews the About implementation.

The final résumé content and any remaining placeholders must be verified before launch.

### M7 — Contact Page Interface

**Objective:** Implement the approved inquiry layout and interactions.

Tasks:

1. Split editorial desktop layout.
2. Responsive stacked mobile layout.
3. Name and email controls.
4. Project category options.
5. Project details input.
6. Submit and direct-email actions.
7. Client-side validation and accessible states.

**Acceptance criteria:**

- Form appearance matches approved references.
- Field behavior and validation work.
- Keyboard and accessibility checks pass.
- The form does not falsely claim to deliver messages.

**Gate:** User reviews the Contact interface.

A real contact submission provider is a separate authorized integration task.

### M8 — Cross-Page Integration and Regression Testing

**Objective:** Validate the four-page application as one consistent website.

Tasks:

1. Verify all direct routes and browser navigation.
2. Verify shared navbar and footer consistency.
3. Test page transitions and component animations together.
4. Check responsive behavior across the approved validation widths.
5. Run unit, component, browser and accessibility checks.
6. Compare screenshots against authorized visual references.
7. Check performance and unexpected layout shifts.
8. Prepare a preview deployment for user review when authorized.

**Acceptance criteria:**

- Required tests pass, with failures or unavailable checks reported accurately.
- No confirmed blocking navigation or interaction defects remain.
- Visual differences are documented for review.
- No unapproved design changes have been introduced.

**Gate:** User reviews the integrated website before prelaunch finalization.

### M9 — Content, Contact Integration and Prelaunch Readiness

**Objective:** Resolve remaining functional, content, accessibility and deployment requirements.

Potential tasks, subject to separate approval:

1. Finalize project selection, ordering and destinations.
2. Verify contact and social URLs.
3. Replace editorial placeholders.
4. Verify the final résumé PDF and correct portfolio URL.
5. Select and implement the contact submission service.
6. Verify form security, abuse controls, delivery and error handling.
7. Complete outstanding contrast and screen-reader checks.
8. Review SEO metadata and prerendered HTML.
9. Complete final performance and regression checks.
10. Review the production deployment plan.

**Acceptance criteria:**

- Required public-facing content is complete and verified.
- No nonfunctional contact submission is represented as working.
- Release-blocking accessibility, security, routing and functionality issues are resolved.
- Final preview has received explicit user acceptance.

**Gate:** Production release requires separate explicit authorization. Completing M9 does not automatically trigger deployment.

## 5. Standard Task Execution Contract

Each authorized task must identify:

- Task ID and milestone.
- Approved objective.
- Relevant design references.
- In-scope changes.
- Explicit exclusions.
- Expected files and dependencies.
- Acceptance criteria.
- Required verification.
- Current implementation status.

Codex then executes Loop A:

**Read → Plan → Implement → Test → Diagnose/Repair → Retest → Report**

Allow at most three repair cycles for the same underlying failure after initial implementation.

When a task passes, becomes blocked, or reaches the retry limit, stop and report.

Afterwards, use Loop B to document genuinely reusable technical findings.

A verified lesson can inform future work but cannot override approved requirements.

## 6. Verification Strategy

Use risk-based testing to minimize unnecessary work.

- Run focused checks during implementation.
- Run wider integration checks when changes affect shared behavior.
- Run full regression and release checks at appropriate milestones.
- Avoid repeatedly executing identical tests when valid evidence has not been invalidated.
- Never skip required checks simply to reduce credits.

Detailed test commands, viewport coverage, accessibility expectations and evidence requirements belong in `docs/TESTING.md`.

## 7. Implementation Status Log

Maintain an entry for each meaningful feature or milestone.

Each entry should contain:

- Feature or task ID.
- Original design intention.
- Approved requirements.
- Current status.
- Relevant files and references.
- Implemented changes.
- Actual test results.
- Repair cycles used.
- Known issues or limitations.
- Latest user feedback.
- Remaining work.
- Next required action.

Codex may update factual implementation progress and test evidence within its authorized scope.

Codex must not independently change approval statuses to **Completed and Approved**.

## 8. Git and Deployment Controls

- Preserve the existing GitHub repository and its history.
- Perform redesign work on a separate branch.
- Verify local uncommitted changes before editing files.
- Do not copy source code or media from the old implementation.
- Use GitHub Actions for approved CI checks.
- Use Vercel Preview Deployments for testing and review.
- Never merge into the production branch or publish to the live website without explicit user approval.

A working preview is evidence for review, not automatic acceptance.

## 9. Credit and Resource Efficiency

The implementation plan must support the approved resource-efficiency policy in `AGENTS.md`.

- Use small, focused, reviewable tasks.
- Avoid redundant analysis and unnecessary file reads.
- Consult only relevant verified lessons.
- Do not perform unrelated refactoring.
- Diagnose failures before retrying.
- Use targeted tests during iteration.
- Stop after meeting the authorized task requirements.
- Produce concise, evidence-based completion reports.

Correctness, security, accessibility and required testing take precedence over saving credits.

## 10. Current Project State

**Approved:**

- Four-page visual and responsive prototype.
- Fresh-code-only implementation requirement.
- Technology stack and infrastructure direction.
- Development Loop A.
- Learning Loop B.
- `AGENTS.md` governance content.
- `REDESIGN_SPEC.md` content.
- `IMPLEMENTATION_PLAN.md` content.
- `TESTING.md` content.
- `LESSONS_LEARNED.md` content.

**Approved for prototype testing, not final interaction acceptance:**

- Smooth Reveal page-load and route-transition direction.

**Not yet completed:**

- Creation of the five Markdown files in GitHub.
- Transfer and verification of final design references.
- Local Git safety verification.
- Application foundation and production implementation.
- Contact backend integration.
- Final public content and release checks.

**M0:** Approved documentation and preparation approach; repository installation not yet performed or reviewed.

## 11. Immediate Next Steps

1. Complete the final cross-document consistency review and preserve all five approved source texts.
2. Transfer the complete approved Markdown files to Codex as explicit source artifacts.
3. Authorize and execute M0 repository safety inspection and documentation creation on an isolated branch.
4. Inventory and transfer final approved visual and interaction references; report missing files rather than inventing them.
5. Review the M0 completion report and verify documentation and reference readiness.
6. Authorize M1 separately only after M0 passes its user-review gate.

**Do not begin M1 or later implementation tasks until the preparation milestone is authorized and reviewed.**
