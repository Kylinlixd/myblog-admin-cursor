# 博客管理系统

一个基于 Vue 3 + Element Plus + Vite 的现代化博客后台管理系统。

## 特点

- 🎨 温暖细腻的设计风格
- 🚀 基于 Vue 3 + Vite 构建
- 💪 使用 Element Plus 组件库
- 📱 响应式设计
- 🔒 安全的用户认证
- 📊 数据可视化展示
- ✅ 完整的单元测试覆盖

## 技术栈

- Vue 3
- Vite
- Element Plus
- Vue Router
- Pinia
- SCSS
- Axios
- Jest
- Vue Test Utils
- Testing Library

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 运行测试

```bash
# 运行所有测试
npm test

# 监视模式运行测试
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

## 项目结构

```
src/
├── api/           # API 接口
├── assets/        # 静态资源
├── components/    # 公共组件
├── layouts/       # 布局组件
├── router/        # 路由配置
├── stores/        # 状态管理
├── styles/        # 样式文件
├── utils/         # 工具函数
└── views/         # 页面组件
```

## 功能模块

- [x] 用户认证
- [x] 仪表盘
- [x] 文章管理
- [x] 分类管理
- [x] 标签管理
- [x] 评论管理
- [ ] 系统设置

## 测试

项目使用 Jest 和 Vue Test Utils 进行单元测试。测试文件位于 `__tests__` 目录下，遵循以下命名规范：
- 组件测试：`ComponentName.test.js`
- API测试：`apiName.test.js`

### 测试覆盖范围

- 组件测试
  - 组件初始化
  - 用户交互
  - 状态变化
  - 事件处理
  - 异步操作

- API测试
  - 请求参数
  - 响应处理
  - 错误处理
  - 数据转换

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

MIT License
