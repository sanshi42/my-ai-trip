# AI Trip MVP

AI Trip 是一个最小可行性产品，用来验证 AI 行程规划网页的核心流程。

## 当前目标

- 用户输入目的地、天数、预算、偏好
- 后端返回 mock itinerary 草案
- 前端展示结果并支持基础中英文切换

## 当前状态

- 已有 `POST /api/v1/trip/mock-plan`
- 已有前端 Trip 页面
- 当前仍是 mock 版本，暂未接入真实 LLM
- 正在逐步清理原始模板遗留的 UI 和文档内容

## 技术栈

- Backend: FastAPI
- Frontend: React + Vite
- Database: PostgreSQL
- Tests: pytest + Playwright

## 本地运行

后端：

```bash
cd backend
uv sync
source .venv/bin/activate
fastapi dev app/main.py
```

前端：

```bash
bun install
bun run dev
```

如果使用 Docker Compose，也可以继续按仓库里的 `development.md` 启动整套环境。

## 下一步建议

- 继续清理模板遗留页面和文案
- 把 mock itinerary 生成逻辑从 router 拆到 service
- 让 mock itinerary 真正根据 `days` 返回结果
- 为 Trip 页面补一个最基础的前端流程测试
