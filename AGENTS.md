# AGENTS.md — Portfolio Redesign

## 1. Project Objective

Implement the approved Portfolio Redesign in the existing GitHub repository using fresh production code.

The approved redesign specification is the source of truth for visual design and interactive behavior.

Do not reuse code, components, CSS, layouts, animations, routing, or media assets from the old portfolio. Only existing links and URLs may be carried forward after verification.

## 2. Approved Technology Stack

- React + Vite + TypeScript
- CSS Modules with shared CSS design tokens
- Motion for React and CSS transitions
- React Router Framework Mode with static prerendering
- TypeScript checking, ESLint, Prettier, Vitest, React Testing Library, Playwright, and axe-core
- GitHub, GitHub Actions, and Vercel preview deployments

Do not introduce additional frameworks or major dependencies without a documented justification and user authorization.

## 3. Project Documentation

Read the relevant project documents before development.

- `docs/REDESIGN_SPEC.md` — Approved visual and interaction requirements.
- `docs/IMPLEMENTATION_PLAN.md` — Authorized tasks, milestones, dependencies, and statuses.
- `docs/TESTING.md` — Test requirements, verification procedures, and acceptance criteria.
- `docs/LESSONS_LEARNED.md` — Verified technical lessons relevant to future work.

The Master Checkpoint maintains historical decisions and approvals. Its existence does not authorize Codex to reinterpret or supersede approved requirements.

## 4. Development Loop — Loop A

For each authorized development task:

1. Read the approved requirements, current task, and relevant verified lessons.
2. Identify the intended result, affected files, risks, and acceptance criteria.
3. Prepare a focused implementation plan.
4. Implement only the authorized task using fresh code.
5. Run all relevant available verification checks.
6. Investigate failures and apply targeted corrections.
7. Retest corrected behavior.

Allow at most **three repair cycles per identified failure after the initial implementation**.

Do not reset the retry count by renaming or reframing the same underlying problem.

If the problem persists, a required check cannot run, or the requirements conflict, stop and report the blocker.

Never weaken or remove valid tests merely to make a failing implementation pass.

## 5. Continuous Learning Loop — Loop B

Record meaningful technical discoveries when they may improve future development.

Use three lesson statuses:

- **Candidate:** A potential finding not yet sufficiently verified.
- **Verified:** A finding supported by reproducible evidence and successful validation.
- **Superseded:** An outdated or incorrect lesson, with its reason and replacement documented.

A verified lesson must identify the relevant problem, context, cause or technical explanation, correction or finding, and verification evidence.

Before planning new work, consult relevant verified lessons.

Do not apply lessons when their assumptions no longer hold.

Lessons are advisory technical knowledge. They cannot override approved requirements, authorize new designs, or become mandatory project-wide rules without explicit user approval.

## 6. Testing and Visual Accuracy

Select verification checks based on the task's risks, following `docs/TESTING.md`.

A successful build does not prove that an implementation matches the approved design.

Test relevant responsive layouts, interactions, navigation, keyboard behavior, and accessibility.

Compare visual output against approved design references.

Never treat an unapproved implementation screenshot as an authoritative visual baseline.

Report tests that failed, were skipped, or could not run. Never claim that unperformed tests passed.

## 7. Git and Deployment Safety

- Work on an isolated development branch.
- Verify repository and local working-tree status before modifying files.
- Preserve the existing portfolio and Git history.
- Do not overwrite unrelated user changes.
- Do not merge into the production branch without explicit authorization.
- Do not publish or promote changes to the live website without explicit authorization.

Preview deployments are for testing and review, not evidence of design approval.

## 8. Human Approval

Codex may correct technical implementation defects within the authorized task and retry limits.

Codex must not independently change approved typography, layouts, interactions, project requirements, or governance rules.

When technical implementation is finished, report it as **Implemented — Pending Review**.

Only the user's explicit acceptance may change the status to **Completed and Approved**.

When blocked, report the blocker accurately rather than claiming completion.

## 9. Required Completion Report

For every implementation task, provide:

- Task and intended acceptance criteria
- Files changed
- Summary of implementation
- Tests executed and their actual results
- Visual or browser evidence where applicable
- Repair cycles used
- Lessons recorded or updated
- Unresolved issues and limitations
- Current implementation status
- Next required action

Stop after completing the authorized scope. Do not begin another feature or perform unrelated refactoring without authorization.

## 10. Credit and Resource Efficiency

Codex must aim to complete every authorized task using the minimum necessary resources without compromising implementation quality.

### Efficient execution

1. **Focused context:** Read only relevant files, approved requirements, and applicable verified lessons. Avoid repeatedly loading the complete repository or lengthy project history.
2. **Concise planning:** Establish the scope, risks, acceptance criteria, and testing approach before implementation. Do not repeatedly replan without new evidence.
3. **No unnecessary work:** Avoid unrelated refactoring, speculative enhancements, repeated searches, and unrequested tasks.
4. **Efficient testing:** Run focused tests during iterative development. Run broader integration and regression checks when required by risk, milestone, or release stage. Reuse valid existing results without treating outdated results as current.
5. **Efficient debugging:** Diagnose failures before attempting corrections. Do not repeat unsuccessful approaches without new evidence. Respect the maximum of three repair cycles.
6. **Avoid redundant operations:** Minimize duplicate tool calls, unnecessary dependency installations, excessive screenshots, and unnecessary parallel agents.
7. **Concise reporting:** Provide essential evidence and clear findings without lengthy repetition.
8. **Stop when appropriate:** Once all required checks pass and the completion report is ready, stop. Do not continue optimizing completed work without authorization.

### Quality takes priority

Never skip required tests, weaken acceptance criteria, conceal failures, compromise security or accessibility, or modify approved designs solely to reduce resource usage.

Credit efficiency must never override the project's technical, design, testing, Git safety, or human approval requirements.

These instructions guide Codex's working behavior; they do not guarantee a fixed credit cost or change platform billing and model settings.
