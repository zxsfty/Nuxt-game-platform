# 全栈游戏平台项目结构

## 前端 (Nuxt3 + Vue3 + TypeScript)
- `/pages` - 页面路由
  - `index.vue` - 游戏官网
  - `forum/` - 论坛模块
  - `chat/` - 聊天群模块
  - `market/` - 交易平台
  - `launcher/` - 游戏启动器
- `/components` - 公共组件
- `/assets` - 静态资源
- `/stores` - 状态管理
- `/utils` - 工具函数

## 后端 (Node.js + Python + C++)
- `/server` - Node.js主服务
  - `controllers/` - 业务逻辑
  - `routes/` - API路由
  - `middlewares/` - 中间件
  - `services/` - 微服务
- `/game` - C++游戏核心
- `/scripts` - Python辅助脚本

## 数据库 (MySQL)
- 用户系统
- 论坛数据
- 聊天记录
- 交易数据

## 其他
- `docker/` - 容器化配置
- `docs/` - 项目文档
- `.env` - 环境变量

## UI风格
- 科幻简约风格
- 深色主题为主
- 霓虹灯效果点缀