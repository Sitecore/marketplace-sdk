# GitHub Copilot — Sitecore Marketplace SDK

This repository is the Sitecore Marketplace SDK, a pnpm TypeScript monorepo for secure host-client communication and typed Sitecore Marketplace, XM Cloud, and AI integrations.

Use these files as the main guidance sources when working in this repo:

- `.cursor/rules/general.mdc` for repo-wide rules, safety boundaries, and contribution workflow.
- `.cursor/rules/javascript.mdc` for TypeScript and JavaScript conventions.
- `.cursor/rules/sitecore.mdc` for Marketplace SDK architecture, generation boundaries, and Sitecore-specific patterns.
- `README.md` for package layout and main commands.
- `CONTRIBUTING.md` for PR and changeset requirements.

Important repo rules:

- Prefer editing hand-written source over generated output.
- Do not hand-edit `dist/**`.
- Do not hand-edit generated API client files under `packages/xmc/src/**` or `packages/ai/src/**` when they are marked as auto-generated.
- If generated behavior is wrong, prefer `packages/xmc/generate-*.ts`, `packages/ai/generate-*.ts`, or `packages/shared/plugins/**`.
- Keep changes scoped to the owning package: `core`, `client`, `xmc`, `ai`, or `shared`.
- Use `pnpm` and prefer narrow validation for the touched package.
- Include a changeset for PRs. Use an empty changeset for docs-only or guidance-only changes.