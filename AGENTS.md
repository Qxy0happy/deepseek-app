# deepseek-app

Wails3 desktop application: Go backend at the repo root, React frontend in `frontend/`.

## Layout

- `frontend/` — React frontend, managed by Vite+ (`vp`). Its commands live in `frontend/package.json`; read `frontend/AGENTS.md` before changing the toolchain. `frontend/dist` is embedded by `main.go`.
- `main.go` — Wails v3 entry point and asset server.
- `Taskfile.yml` — canonical tasks: `wails3 task dev`, `build`, `check`, `fmt`.

## Verification

Run `wails3 task check` before committing. It covers `vp check`, `vp build`, `gofumpt`, `revive`, `go vet`, and `go test`.

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues for `Qxy0happy/deepseek-app`. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical triage roles use the default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
