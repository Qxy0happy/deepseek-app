# deepseek-app

基于 DeepSeek API 的桌面客户端。Wails v3（Go）提供窗口与本地资源，`frontend/` 是 React 前端。

## 结构

- `main.go` — Wails 应用入口，嵌入 `frontend/dist` 并通过资源服务器提供页面
- `frontend/` — React + TypeScript 前端，由 Vite+（`vp`）管理
- `build/` — Wails 各平台构建资源
- `Taskfile.yml` — 统一任务入口

## 环境

- Go 1.26+
- Wails v3.1.0（`wails3`）
- Node.js 22.12+、pnpm
- Linux 需要 GTK4 与 WebKitGTK 6.0 开发包

## 命令

| 命令 | 作用 |
| --- | --- |
| `wails3 task dev` | 启动 Wails 开发模式，前端由 Vite dev server 提供并热更新 |
| `wails3 task build` | 构建 `bin/deepseek-app` |
| `wails3 task check` | 运行 Go 格式、revive、vet、测试，以及前端的 `vp check` 与 `vp build` |
| `wails3 task fmt` | 格式化 Go 与前端代码 |

只开发前端：

```sh
cd frontend
vp install
vp dev
```

前端默认使用 8090 端口；Wails 开发模式会通过 `--port` 覆盖。

## 配置

首次启动在 Settings 中填入 DeepSeek API Key。会话与设置保存在本地浏览器存储中，不经过应用后端。

CI 在 `.github/workflows/ci.yml` 中执行 `wails3 task check`。
