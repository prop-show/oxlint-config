# @prop-show/oxlint-config

个人的 oxlint + oxfmt 配置，打包成一个 npm 包，其他项目直接引入即可。

lint 四套 preset，逐层叠加：

| preset       | 内容                                               |
| ------------ | -------------------------------------------------- |
| `base`       | 通用规则（correctness/suspicious/perf + 常用规则） |
| `typescript` | `base` + TS 规则                                   |
| `react`      | `typescript` + `react` / `jsx-a11y` 插件           |
| `vue`        | `typescript` + `vue` 插件                          |

外加一份与语言无关的 `fmt`（oxfmt 格式化配置）。

导出的都是普通配置对象（构建期用 `vite-plus/lint`、`vite-plus/fmt` 的类型校验，产物 d.ts 自带类型），没有任何运行时依赖。

## 安装

```bash
# 普通 oxlint / oxfmt 项目
pnpm add -D oxlint oxfmt @prop-show/oxlint-config

# vite-plus 项目（自带 lint / fmt）
pnpm add -D vite-plus @prop-show/oxlint-config
```

两个子路径入口，按需引入：`@prop-show/oxlint-config/lint`（四套 lint preset）、
`@prop-show/oxlint-config/fmt`（oxfmt 配置）；根入口 `@prop-show/oxlint-config` 是两者之和。

## Lint

### oxlint 项目（`oxlint.config.ts`）

```ts
import { vue } from "@prop-show/oxlint-config/lint";
import { defineConfig } from "oxlint";

export default defineConfig({ extends: [vue] });
```

TS 配置需要 Node 运行（`oxlint` 的实验特性），且项目里必须能解析到 `oxlint`。

### vite-plus 项目（`vite.config.ts`）

```ts
import { vue } from "@prop-show/oxlint-config/lint";
import { defineConfig } from "vite-plus";

export default defineConfig({ lint: vue });
```

`lint` 块不接受 `extends`，所以直接用某一个 preset（preset 内部已经合并好）。

### 改规则

preset 是普通对象，覆盖后传进去即可：

```ts
import { vue } from "@prop-show/oxlint-config/lint";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [{ ...vue, rules: { ...vue.rules, "no-console": "off" } }],
});
```

规则和各插件集合在 `src/lint/` 里，改完 `vp pack` 重新发布。

## Format

```ts
// oxfmt.config.ts
import { fmt } from "@prop-show/oxlint-config/fmt";
import { defineConfig } from "oxfmt";

export default defineConfig(fmt);
```

```ts
// vite-plus: vite.config.ts
import { fmt } from "@prop-show/oxlint-config/fmt";
import { defineConfig } from "vite-plus";

export default defineConfig({ fmt });
```

同样可以直接改：`{ ...fmt, printWidth: 120 }`。配置在 `src/fmt/index.ts`；`src/core/ignore-patterns.ts` 是 lint 与 fmt 共用的忽略列表。

## 注意

- 没有开 `typeAware`（需要装 `oxlint-tsgolint`）。需要的话在项目自己的配置里加
  `options: { typeAware: true }`，例如 vite-plus 的 `lint: { ...vue, options: { ...vue.options, typeAware: true } }`。
- `.oxlintrc.json` 的 `extends` 只认文件路径、不认包名，所以要么用 TS 配置，要么写
  `{ "extends": ["./node_modules/@prop-show/oxlint-config/dist/index.mjs"] }`——不推荐，用 TS 配置。
- `.oxfmtrc.json` 没有 `extends` 字段，纯 JSON 里引不了这个包；用 `oxfmt.config.ts`。

## 开发

```bash
vp install
vp test
vp pack        # 产物在 dist/
```

## License

MIT
