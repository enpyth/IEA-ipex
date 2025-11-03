# Next.js Shadcn Dashboard Starter 项目介绍

## 项目概述

这是一个基于 Next.js 15.3.2 和 Shadcn/ui 组件库构建的现代化仪表板启动器项目。项目采用了最新的技术栈，包括 TypeScript、Tailwind CSS、Supabase 等，为开发者提供了一个功能完整、架构清晰的企业级应用基础框架。

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI 组件库**: Shadcn/ui + Tailwind CSS
- **开发语言**: TypeScript
- **状态管理**: Zustand
- **数据库**: Supabase
- **认证**: Supabase Auth
- **包管理器**: pnpm
- **代码质量**: ESLint, Prettier

## 目录结构详解

### 根目录文件

```
├── components.json          # Shadcn/ui 配置文件
├── next.config.ts          # Next.js 配置文件
├── package.json            # 项目依赖配置
├── pnpm-lock.yaml         # pnpm 锁定文件
├── postcss.config.js      # PostCSS 配置
├── tsconfig.json          # TypeScript 配置
├── env.example.txt        # 环境变量示例文件
└── README.md              # 项目说明文档
```

### 核心源代码目录 (`src/`)

#### 1. 应用入口 (`src/app/`)

```
src/app/
├── api/                   # API 路由
│   └── items/            # 项目管理 API
│       ├── [id]/         # 动态路由 - 单个项目
│       └── route.ts      # 项目列表 API
├── auth/                  # 认证相关页面
│   ├── auth-code-error/  # 认证错误页面
│   ├── callback/         # 认证回调处理
│   ├── sign-in/          # 登录页面
│   └── sign-up/          # 注册页面
├── dashboard/             # 仪表板主界面
│   ├── item/             # 项目管理
│   │   ├── [id]/         # 项目详情/编辑
│   │   └── new/          # 新建项目
│   ├── kanban/           # 看板视图
│   ├── overview/         # 概览页面（并行路由）
│   │   ├── @area_stats/  # 面积统计图表
│   │   ├── @bar_stats/   # 柱状图统计
│   │   ├── @pie_stats/   # 饼图统计
│   │   └── @sales/       # 销售数据
│   ├── product/          # 产品管理
│   └── profile/          # 用户档案
├── globals.css            # 全局样式
├── layout.tsx             # 根布局组件
└── page.tsx               # 首页
```

#### 2. 组件库 (`src/components/`)

```
src/components/
├── ui/                    # Shadcn/ui 基础组件
│   ├── button.tsx        # 按钮组件
│   ├── card.tsx          # 卡片组件
│   ├── table/            # 数据表格组件
│   ├── form.tsx          # 表单组件
│   └── ...               # 其他 UI 组件
├── layout/                # 布局相关组件
│   ├── app-sidebar.tsx   # 应用侧边栏
│   ├── header.tsx        # 页面头部
│   ├── page-container.tsx # 页面容器
│   └── providers.tsx     # 上下文提供者
├── modal/                 # 模态框组件
├── nav-main.tsx          # 主导航
├── nav-projects.tsx      # 项目导航
├── nav-user.tsx          # 用户导航
└── search-input.tsx      # 搜索输入框
```

#### 3. 功能模块 (`src/features/`)

```
src/features/
├── auth/                  # 认证功能模块
│   └── components/       # 认证相关组件
│       ├── github-auth-button.tsx    # GitHub 认证按钮
│       ├── sign-in-view.tsx          # 登录视图
│       ├── sign-up-view.tsx          # 注册视图
│       └── user-auth-form.tsx        # 用户认证表单
├── home/                  # 首页功能模块
│   ├── Banner.tsx        # 横幅组件
│   ├── Header.tsx        # 首页头部
│   ├── Introduction.tsx  # 介绍组件
│   └── Product.tsx       # 产品展示
├── kanban/                # 看板功能模块
│   ├── components/       # 看板组件
│   │   ├── kanban-board.tsx         # 看板主组件
│   │   ├── board-column.tsx         # 看板列
│   │   ├── task-card.tsx            # 任务卡片
│   │   └── new-task-dialog.tsx      # 新建任务对话框
│   └── utils/            # 看板工具函数
│       ├── store.ts      # 状态管理
│       └── index.ts      # 工具函数导出
├── overview/              # 概览功能模块
│   ├── components/       # 概览组件
│   │   ├── area-graph.tsx           # 面积图
│   │   ├── bar-graph.tsx            # 柱状图
│   │   ├── pie-graph.tsx            # 饼图
│   │   └── recent-sales.tsx         # 最近销售
│   └── ...               # 其他概览组件
├── products/              # 产品管理模块
│   ├── components/       # 产品组件
│   │   ├── product-listing.tsx      # 产品列表
│   │   ├── product-form.tsx         # 产品表单
│   │   └── product-tables/          # 产品表格
│   └── ...               # 其他产品组件
└── profile/               # 用户档案模块
    ├── components/       # 档案组件
    │   ├── profile-create-form.tsx  # 档案创建表单
    │   └── profile-view-page.tsx    # 档案查看页面
    └── utils/            # 档案工具函数
        └── form-schema.ts # 表单验证模式
```

#### 4. 工具库 (`src/lib/`)

```
src/lib/
├── auth.ts               # 认证工具函数
├── contexts/             # React 上下文
│   ├── AuthContext.tsx   # 认证上下文
│   ├── LanguageContext.tsx # 语言上下文
│   └── LanguageContent.tsx # 语言内容
├── data-table.ts         # 数据表格工具
├── file-upload.ts        # 文件上传工具
├── font.ts               # 字体配置
├── format.ts             # 格式化工具
├── parsers.ts            # 解析工具
├── profiles.ts           # 档案相关工具
├── searchparams.ts       # 搜索参数工具
├── supabase-server.ts    # Supabase 服务端
├── supabase.ts           # Supabase 客户端
└── utils.ts              # 通用工具函数
```

#### 5. 类型定义 (`src/types/`)

```
src/types/
├── data-table.ts         # 数据表格类型
├── database.ts           # 数据库类型
├── index.ts              # 类型导出
└── items.ts              # 项目相关类型
```

#### 6. 自定义钩子 (`src/hooks/`)

```
src/hooks/
├── use-breadcrumbs.tsx   # 面包屑导航钩子
├── use-callback-ref.ts   # 回调引用钩子
├── use-controllable-state.tsx # 可控状态钩子
├── use-data-table.ts     # 数据表格钩子
├── use-debounce.tsx      # 防抖钩子
├── use-debounced-callback.ts # 防抖回调钩子
├── use-media-query.ts    # 媒体查询钩子
├── use-mobile.tsx        # 移动端检测钩子
└── use-multistep-form.tsx # 多步表单钩子
```

#### 7. 数据库层 (`src/db/`)

```
src/db/
├── items.ts              # 项目数据操作
└── profile.ts            # 档案数据操作
```

#### 8. 常量配置 (`src/constants/`)

```
src/constants/
├── data.ts               # 静态数据
└── mock-api.ts           # 模拟 API 数据
```

#### 9. 配置文件 (`src/config/`)

```
src/config/
└── data-table.ts         # 数据表格配置
```

## 架构特点

### 1. 模块化设计
- 采用功能模块化组织代码，每个功能模块独立管理
- 清晰的关注点分离，便于维护和扩展

### 2. 组件化架构
- 基于 Shadcn/ui 的组件库，提供一致的设计语言
- 可复用的组件设计，提高开发效率

### 3. 类型安全
- 完整的 TypeScript 类型定义
- 数据库类型与前端类型保持一致

### 4. 现代化路由
- 使用 Next.js 15 App Router
- 支持并行路由和动态路由
- 内置的加载状态和错误处理

### 5. 状态管理
- 使用 Zustand 进行轻量级状态管理
- React Context 用于全局状态共享

## 开发指南

### 添加新功能模块
1. 在 `src/features/` 下创建新的模块目录
2. 遵循现有的目录结构组织代码
3. 在 `src/types/` 中添加相应的类型定义
4. 在 `src/lib/` 中添加相关的工具函数

### 添加新页面
1. 在 `src/app/` 下创建相应的路由目录
2. 创建 `page.tsx` 文件作为页面组件
3. 在 `src/components/` 中添加页面相关的组件

### 添加新组件
1. 通用组件放在 `src/components/ui/`
2. 功能特定组件放在对应功能模块的 `components/` 目录下
3. 遵循 Shadcn/ui 的组件设计规范

## 总结

这个项目提供了一个完整的、可扩展的现代 Web 应用架构。通过清晰的目录结构和模块化设计，开发者可以快速理解项目结构，并在此基础上进行功能扩展和定制开发。项目采用了当前最流行的技术栈，确保了代码质量和开发效率。



---

# CRUD 例子: item表单

## 1. CRUD页面

### Dashboard item
src/app/dashboard/item/page.tsx -> http://localhost:3000/dashboard/item

### new a item
src/app/dashboard/item/new/page.tsx

### display item details
src/app/dashboard/item/[id]/page.tsx

### edit item
src/app/dashboard/item/[id]/edit/page.tsx


## 2. item核心代码

### item表结构
src/features/products/components/listing-item.tsx

### 数据库CRUD接口
src/db/items.ts

### 数据结构

目录 src/types

原始结构 src/types/database.ts

接口结构 src/types/items.ts

## 3. Dashboard配置

Dashboard tab bar 自定义页面 src/constants/data.ts

Dashboard表单属性 src/features/products/components/product-tables/columns-item.tsx