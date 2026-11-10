# Portfolio Redesign — Lessons Learned

**Status:** Approved for Implementation — Installed in Repository

**Project:** Portfolio Redesign

**Purpose:** Maintain a concise, evidence-based record of reusable technical discoveries from Codex development tasks.

**Related documents:** `AGENTS.md`, `docs/REDESIGN_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/TESTING.md`

## 1. Objective

This document supports **Loop B — Continuous Learning**.

Its purpose is to help future development tasks benefit from verified technical findings without repeating unnecessary investigation.

The learning loop follows six approved principles:

1. Capture meaningful discoveries.
2. Verify findings through evidence.
3. Classify lesson status.
4. Reuse relevant verified lessons.
5. Revalidate findings when conditions change.
6. Protect approved requirements and governance.

This is project-level documented learning, not automatic retraining of the AI model.

## 2. Authority and Boundaries

Lessons provide technical guidance, not design authority.

The approved design, implementation requirements, and governance rules remain authoritative.

Codex must not use a lesson to:

- Change approved layouts, typography, colors, or interactions.
- Rewrite the approved design specification.
- Modify `AGENTS.md` or mandatory testing requirements.
- Introduce unauthorized dependencies or frameworks.
- Expand development scope.
- Bypass human review.
- Weaken acceptance criteria to make an implementation pass.

If a lesson conflicts with an approved requirement, the requirement takes precedence.

Any proposed project-wide rule change requires explicit user approval.

## 3. Lesson Statuses

Each lesson must have one of the following statuses.

### Candidate

A potentially useful technical finding that has not yet been sufficiently verified.

Candidate lessons are not trusted instructions and must not be treated as established solutions.

### Verified

A technical finding supported by appropriate reproducible evidence, successful checks, and an explanation of where it applies.

Verified lessons may inform future task planning.

### Superseded

A lesson that is no longer reliable, relevant, or applicable because new evidence or project changes have replaced it.

Preserve the historical entry, the reason for superseding it, and any replacement lesson.

Do not silently delete previous findings.

## 4. When to Record a Lesson

Record a lesson when a finding is likely to improve future development.

Appropriate examples include:

- A recurring animation or interaction defect and its verified correction.
- A reliable solution to a routing or static-rendering problem.
- A documented browser compatibility issue.
- An accessibility issue whose cause and correction were established.
- A testing approach that reliably detects a specific class of failures.
- A framework-specific behavior that affects implementation decisions.
- A previously unsuccessful technical approach that should not be repeated.

Avoid recording:

- Routine successful builds.
- Trivial syntax mistakes.
- Obvious information already available in project instructions.
- Duplicate lessons.
- Unverified assumptions presented as facts.
- Long task transcripts with little reusable value.

Not every task needs to produce a lesson.

If nothing meaningful was learned, report that no reusable lesson was identified.

## 5. Required Lesson Format

Each significant lesson should use this structure:

### LL-XXX — Concise Lesson Title

**Status:** Candidate / Verified / Superseded

**Date:** YYYY-MM-DD

**Related task:** Task ID and milestone

**Category:** Animation / Routing / Styling / Accessibility / Testing / Performance / Tooling / Other

**Environment:** Relevant framework, browser, package, and configuration details

**Problem or discovery:** What was observed?

**Reproduction or context:** Under what conditions does it occur?

**Evidence:** Relevant test results, logs, screenshots, or source references

**Cause or technical explanation:** What has been established, and what remains uncertain?

**Correction or finding:** What was changed or discovered?

**Verification:** Which actual checks support the finding?

**Applicability:** When should future tasks consider this lesson?

**Limitations:** When might this lesson not apply?

**Related lessons:** Relevant lesson IDs, if any

**Supersession:** Replacement lesson and reason, if applicable

Keep entries concise while preserving enough information to make them useful.

Use sequential identifiers such as `LL-001`, `LL-002`, and `LL-003`.

Do not reuse a retired identifier for an unrelated finding.

## 6. Lesson Capture Process

When Codex encounters a meaningful technical issue:

1. Identify the problem and its task context.
2. Determine whether a relevant existing lesson already covers it.
3. If needed, create or update a Candidate entry.
4. Record the available evidence without claiming an unproven cause.
5. Investigate and correct the problem within Loop A's authorized scope and repair limit.
6. Record the tests that were actually executed.
7. Evaluate whether the results justify Verified status.
8. If the issue remains unresolved, retain Candidate status and record the limitation.

A hypothesis is not a confirmed root cause merely because the implementation started working.

The explanation must accurately reflect the evidence available.

## 7. Verification Requirements

A lesson may become Verified only when the supporting evidence is sufficient for its claim.

At minimum, establish:

- The relevant situation or failure.
- The technical explanation or correction.
- The applicable environment.
- The tests or procedures actually used.
- The observed results.
- Any remaining limitations.

For a defect correction, successful relevant retesting should demonstrate that the previously failing behavior has been resolved.

Where appropriate, also run regression checks to confirm that the correction did not break related functionality.

A single successful outcome does not justify claims of universal reliability.

Do not report unperformed tests as passed.

If the evidence is incomplete, retain Candidate status.

A Verified lesson does not mean its related feature is automatically Completed and Approved. Feature acceptance remains a separate user decision.

## 8. Reusing Lessons During Future Tasks

Before implementing a new task, Codex should consult the relevant Verified lessons.

Use this sequence:

1. Identify the new task's technical areas.
2. Find lessons matching those areas.
3. Check whether their assumptions and environment still apply.
4. Incorporate genuinely relevant findings into the task plan.
5. Verify the new implementation independently.

Do not automatically load or summarize the entire lesson history for every task.

Do not apply irrelevant lessons simply because they are Verified.

An earlier successful technique is useful guidance, not a substitute for current testing.

## 9. Revalidation and Supersession

Reevaluate a lesson when:

- A dependency or framework changes.
- Browser behavior changes.
- A previously reliable technique fails.
- New evidence contradicts an earlier explanation.
- The application architecture changes.
- A more reliable solution is verified.

When a lesson is no longer applicable:

1. Identify the conflicting evidence.
2. Record the affected context.
3. Explain why the existing lesson is outdated or incorrect.
4. Change its status to Superseded.
5. Link to a replacement lesson when available.
6. Preserve the original historical explanation.

If a prior lesson becomes uncertain but no replacement has been verified, clearly mark the uncertainty rather than inventing a solution.

## 10. Relationship to Loop A

Loop A handles implementation and correction.

Loop B records reusable knowledge derived from that work.

A lesson must not reset Loop A's repair limit.

For example, creating a new lesson about an unresolved defect does not grant three more repair cycles for that same underlying failure.

When the repair limit is reached, Codex must stop and report the blocker.

Any further implementation work requires the appropriate authorization.

## 11. Documentation Permissions

Codex may:

- Add Candidate lessons within authorized task work.
- Promote lessons to Verified when evidence meets the approved requirements.
- Mark lessons Superseded when supported by new evidence.
- Add references and clarifications that preserve historical accuracy.
- Consult relevant Verified lessons during planning.

Codex may not:

- Silently remove historical lessons.
- Claim evidence that does not exist.
- Rewrite a lesson to conceal a failed approach.
- Automatically promote lessons into mandatory project-wide rules.
- Change approved design or governance documents based solely on lessons.
- Use lessons as permission for unrelated code changes.

Proposed improvements to project-wide development rules must be presented separately for user approval.

## 12. Credit and Context Efficiency

The learning system must remain lightweight.

- Store reusable conclusions rather than full transcripts.
- Link to relevant evidence instead of duplicating large outputs.
- Avoid recording the same finding repeatedly.
- Consult only task-relevant lessons.
- Avoid unnecessary rereading of the entire file.
- Keep lesson entries structured and concise.
- Archive or organize old lessons when the document becomes unwieldy, preserving identifiers and history.

No additional agent, recurring research process, or automated analysis is required merely to maintain this document.

The objective is to reduce repeated mistakes and unnecessary investigation, not create more work for Codex.

## 13. Learning Review During Milestones

At each major implementation milestone, Codex should briefly report:

- Newly verified lessons.
- Existing lessons reused.
- Candidate lessons still awaiting verification.
- Superseded lessons, if any.
- Significant technical patterns worth discussing.

This report should be concise.

The user may approve a proposed change to the broader development process, but such approval must be recorded separately before altering governance.

## 14. Initial Lesson Register

M1 fresh application foundation has been implemented and remains pending user review.

There are currently **two verified technical lessons from the new implementation**: LL-001 and LL-002 below. Their Verified status does not establish user acceptance of M1.

Do not import old portfolio implementation techniques, legacy source code, or undocumented claims into this register.

Historical prototype findings may inform the approved design specification and acceptance criteria, but they must not be misrepresented as verified findings from the new production implementation.

These findings were established during authorized M1 implementation and verification. They apply only within the environments and limitations recorded below.

### LL-001 — React Router `isbot` Dependency

**Status:** Verified

**Date:** 2026-11-10

**Related task:** M1 — Fresh Application Foundation, rendering-entry setup

**Category:** Tooling

**Environment:** Windows, Node.js 24.21.0, npm 11.19.0, React Router / `@react-router/dev` 8.5.1, default server entry, static prerendering with `ssr: false`.

**Problem or discovery:** Initial `npm run typecheck` triggered a nested dependency installation because `isbot` was absent from direct application dependencies. The run printed `adding isbot@5 to your package.json` and subsequently failed to resolve `@react-router/dev`; other development-tool commands were also unavailable after that install.

**Reproduction or context:** The installed framework selected its default server entry because this project supplies no custom `entry.server` module. Its entry-resolution code checks `package.json` direct dependencies for `isbot`.

**Evidence:** Installed framework source: `node_modules/@react-router/dev/dist/typegen-CqlAVM2O.js`, entry-resolution block around lines 445–475. It adds `isbot: ^5` and invokes the detected package manager's install command when the dependency is absent. M1 command output in this review chat records the nested install and subsequent failures. [package.json](../package.json) and [package-lock.json](../package-lock.json) record the explicit resolved dependency.

**Cause or technical explanation:** The nested install is confirmed by the framework source and observed output. Its exact role in removing local development tools was not independently isolated; do not generalize that side effect to every environment.

**Correction or finding:** Explicitly installed and pinned `isbot` 5.2.3, then restored declared dependencies with `npm ci --include=dev`.

**Verification:** Subsequent `npm run typecheck` (including `react-router typegen`) and `npm run build` passed. The build prerendered `/`, `/works`, `/about`, and `/contact`. No tests were rerun for this lesson closeout.

**Applicability:** This project's installed React Router 8.5.1 default server-entry configuration, including its build-time rendering during static prerendering.

**Limitations:** This does not establish that every React Router application requires an explicit `isbot` dependency. Revalidate for custom server entries, changed framework versions, or different dependency arrangements. Generated dependency files and local command evidence may not persist after reinstall or cleanup.

**Related lessons:** None.

**Supersession:** None.

### LL-002 — Static Preview Clean-URL Routing

**Status:** Verified

**Date:** 2026-11-10

**Related task:** M1 — Fresh Application Foundation, local production-output preview

**Category:** Routing

**Environment:** This project's Windows/Node.js local static preview, React Router 8.5.1 prerendered output in `build/client`, Playwright 1.65.0 with Microsoft Edge.

**Problem or discovery:** The original Vite preview command returned Homepage HTML for direct requests to `/works`, `/about`, and `/contact`, despite the build having generated separate route HTML files.

**Reproduction or context:** The first M1 browser run fetched each clean route URL and asserted its page-specific `<h1>` in the raw response. Those three assertions received Homepage HTML instead. Client navigation alone did not expose this serving problem.

**Evidence:** Initial failing and subsequent successful `npm run test:e2e` outputs are recorded in this review chat. [scripts/preview.mjs](../scripts/preview.mjs) maps existing route directories to `index.html`; [tests/e2e/foundation.spec.ts](../tests/e2e/foundation.spec.ts) checks raw HTML, direct navigation, hydration, refresh, accessibility and browser errors. The local `test-results/.last-run.json` currently records `status: passed` with no failed tests; this ignored, replaceable summary does not by itself identify individual checks.

**Cause or technical explanation:** The original local preview fallback served root HTML for clean route requests instead of the corresponding prerendered documents. Static HTML generation and correct URL-to-file serving are separate requirements.

**Correction or finding:** Replaced the preview command with the project's minimal Node.js static preview server. Existing route directories resolve to their prerendered `index.html`; unknown extensionless paths use the generated SPA fallback. Missing file assets return 404.

**Verification:** The subsequent `npm run test:e2e` passed all five tests. Four route-specific tests verified `/`, `/works`, `/about`, and `/contact`: correct raw HTML, direct rendering, interactive hydration, reload, zero axe violations and no captured console/page errors. The fifth test verified client navigation, history and an unknown-route shell. No tests were rerun for this lesson closeout.

**Applicability:** This project's local static-preview configuration and current prerendered directory structure.

**Limitations:** This does not verify production hosting rewrites, other static servers, or future route structures. The original Vite preview failure is specific to the observed configuration, not a claim about every Vite project. Hosting must be verified separately when authorized.

**Related lessons:** None.

**Supersession:** None.

## 15. Example Entry — Illustration Only

The following is hypothetical and must not be recorded as a real project discovery.

### LL-EXAMPLE — Cursor Preview Position Continuity

**Status:** Candidate — illustrative only

**Related task:** Hypothetical Homepage Selected Work implementation

**Category:** Animation

**Problem:** The project image preview jumps when the pointer moves rapidly between project rows.

**Possible explanation:** A preview transition may be initialized from an outdated pointer position.

**Potential correction:** Evaluate whether preview state should preserve the most recent pointer coordinates.

**Verification needed:** Pointer-movement tests, project-switching tests, browser evidence, and regression checks.

**Applicability:** Similar pointer-follow interactions, if the cause and correction are later verified.

**Limitation:** No real implementation or testing evidence exists for this example.

This entry illustrates documentation format only. It is not an approved solution.

## 16. Final Learning Principle

The purpose of the learning loop is not to accumulate as many lessons as possible.

It is to preserve **reliable, reusable technical knowledge** that helps Codex make better implementation decisions in future tasks.

Every lesson must remain evidence-based, context-aware, and subordinate to the approved project requirements.

**Loop A improves the implementation. Loop B improves the process. The user retains final authority.**
