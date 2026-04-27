# Hyatt 2026 调表地图

2026 年凯悦（World of Hyatt）积分房价格调整可视化工具。143 家酒店，一张交互地图看完哪里涨得最凶。

**在线访问** &rarr; [zqm.ai/misc/Hyatt](https://zqm.ai/misc/Hyatt)

## 数据概况

- **生效日期**：2026.05.20 08:00 CT（含 7 家 2/25 已提前生效）
- **涉及酒店**：142 家，覆盖美洲、欧洲、亚太、中东非洲
- **价格口径**：Old Standard &rarr; New Moderate（中位价），同时展示峰值变化
- **数据来源**：[world.hyatt.com/awardchartupdates](https://world.hyatt.com/content/gp/en/rewards/award-chart-updates.html)（4/24/2026 公告）

## 功能

- **双模式地图** &mdash; 平铺（Natural Earth）/ 立体（Orthographic）两种投影，丝滑变形切换
- **多维筛选** &mdash; 区域、升降方向、Cat 等级、国家、城市、关键词搜索，可叠加
- **涨幅色阶** &mdash; 从「真省」到「暴涨」五级连续色标，一眼识别
- **Cert 标记** &mdash; 失去 1-4 / 1-7 free night cert 资格的酒店加金环高亮
- **UR 转点损失** &mdash; Tooltip 内展示 Chase UR 1:1 转点后单晚多耗多少积分
- **明暗主题** &mdash; 自动跟随系统 `prefers-color-scheme`
- **响应式** &mdash; 桌面宽屏 / 平板 / 手机三级适配

## 技术栈

纯前端，零构建工具，GitHub Pages 直接部署。

- **渲染**：D3.js v7（地图投影 + SVG marker）
- **地理数据**：[world-atlas](https://github.com/topojson/world-atlas) 110m TopoJSON
- **样式**：原生 CSS 自定义属性 + 响应式断点
- **脚本**：ES Modules，无打包

## 项目结构

```
hyatt/
  index.html              # 入口
  css/
    variables.css          # 颜色、布局 token、dark mode
    base.css               # Reset、排版
    components.css         # Pill、输入框、Tooltip 等组件
    layout.css             # Header、地图、列表、图例、Footer
    markers.css            # SVG 标记点 + 脉冲动画
    responsive.css         # 宽屏 / 平板 / 手机断点
  js/
    config.js              # 常量（动画时长、投影参数等）
    data.js                # 143 家酒店数据 + 新旧费率表
    utils.js               # 纯函数（涨幅计算、颜色映射等）
    state.js               # 筛选状态 + 排序 + 调度
    map.js                 # D3 地图引擎（平铺/立体/变形/缩放）
    list.js                # 酒店列表渲染 + 高亮联动
    filters.js             # 筛选器事件绑定 + 搜索防抖
    tooltip.js             # Tooltip 构建 + 定位
    app.js                 # 入口：初始化各模块
```

## 本地运行

ES Modules 必须通过 HTTP 加载，直接双击 `index.html` 会报 CORS 错误。

```bash
# 启动静态服务器并自动打开浏览器（macOS）
python3 -m http.server 8080 & open http://localhost:8080

# 用完后关掉后台服务器
kill %1
```

> **Windows** 用户把 `open` 换成 `start`；**Linux** 用户换成 `xdg-open`。
> 也可以用 `npx serve`、VS Code Live Server 等任意静态服务器替代。

## 许可

MIT
