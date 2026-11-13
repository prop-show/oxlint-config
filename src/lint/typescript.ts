import type { OxlintConfig } from "vite-plus/lint";

import { base } from "./base.ts";

/** TypeScript 项目通用（依赖 oxlint 内置的 typescript 插件，默认已开启）。 */
export const typescript = {
  ...base,
  rules: {
    ...base.rules,
    "typescript/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
    "typescript/no-import-type-side-effects": "error",
    "typescript/array-type": ["error", { default: "array-simple" }],
    "typescript/no-explicit-any": "warn",
    "typescript/no-non-null-assertion": "warn",
  },
} satisfies OxlintConfig;
