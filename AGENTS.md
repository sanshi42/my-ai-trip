# AI Trip MVP Project

这是一个最小可行性产品（MVP）项目。

## 当前目标

做一个 AI 行程规划网页：
- 用户输入目的地、天数、预算、偏好
- 后端返回 itinerary 草案
- 前端展示结果

## 当前阶段
当前只做 mock 版本：
- 先不要接真实 LLM
- 先不要做支付、订票、日历同步、多 agent

## 技术栈
- Backend: FastAPI
- Frontend: React
- Database: PostgreSQL
- Tests: pytest

## 修改规则

- 不要大规模重构
- 每次只改完成当前任务所需的最少文件
- 不要在 router 中直接写复杂 AI 逻辑
- 和 LLM 相关的 prompt 统一放在 /prompts
- 如果改了接口，补充最基本的测试

## 每次完成任务后，必须输出
1. 改了哪些文件
2. 如何运行/验证
3. 已知限制