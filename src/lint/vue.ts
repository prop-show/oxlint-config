import type { OxlintConfig } from "vite-plus/lint";

import { typescript } from "./typescript.ts";

/** Vue 项目。plugins 一旦设置会覆盖默认集合，因此把默认插件显式列全。 */
export const vue = {
  ...typescript,
  plugins: ["oxc", "unicorn", "typescript", "import", "promise", "vue"],
  rules: {},
  env: { builtin: true, browser: true },
} satisfies OxlintConfig;
