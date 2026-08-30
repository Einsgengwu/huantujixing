# 宦途疾行

庆历主题三车道跑酷与四线升官 Web 游戏。操纵绯袍小官在官道间疾行，拾取奏章、封赏与功劳，避开谪令和诏狱，在六分钟任期中经历一场仕途沉浮。

🎮 **[网页试玩](https://einsgengwu.github.io/huantujixing/)**

## 玩法简介

- 支持鼠标和触屏操作，角色跟随指针或手指移动
- 碰触红色卷轴升官，避开蓝色谪令与黑色诏狱
- 封赏和功劳积满后可补升官阶
- 四线官职顶格后可进入黄袍终局与伪帝 Boss 战
- 提供平易、中庸、严苛、地狱及 Boss 战体验模式
- 包含玩法引导、典故图鉴、人生卷轴、版本日志和本地存档

## 版本说明

本仓库为独立离线版本，保留原游戏的完整单机玩法、全部难度、Boss 战、图鉴、日志及本地存档。项目不使用后端接口、数据库或网络同步，可直接部署到 GitHub Pages 等静态托管平台。

## 本地运行

双击 `serve.bat`，或在项目目录启动任意静态服务器：

```bash
# Python
python -m http.server 8765

# Node.js
npx serve .
```

然后访问 `http://localhost:8765`。不要直接双击 `index.html`，因为游戏数据需要通过浏览器加载本地 JSON 文件。

## 项目结构

```text
index.html       游戏入口
css/             页面与游戏界面样式
js/              游戏逻辑、数据与图鉴
assets/          图片与视觉资源
docs/            项目文档
serve.bat        Windows 本地启动脚本
```

## 技术栈

- 原生 HTML、CSS 和 JavaScript
- Canvas 2D 游戏渲染
- LocalStorage 本地存档
- 无需构建工具和后端服务

## 许可

本项目源代码公开，并采用 [PolyForm Noncommercial License 1.0.0](LICENSE) 授权，仅允许非商业用途下的使用、修改与分发。任何商业用途均须事先取得版权所有者的书面授权。
