import type { OxlintConfig } from "vite-plus/lint";

import { typescript } from "./typescript.ts";

/** React 项目。plugins 一旦设置会覆盖默认集合，因此把默认插件显式列全。 */
export const react = {
  ...typescript,
  plugins: ["oxc", "unicorn", "typescript", "import", "promise", "react", "jsx-a11y"],
  rules: {
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "error",
    "react/jsx-key": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-script-url": "error",
    "react/no-danger-with-children": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-unknown-property": "error",
    "react/no-unstable-nested-components": "error",
    "react/set-state-in-effect": "error",
    "react/set-state-in-render": "error",
    "react/no-deriving-state-in-effects": "error",
    "react/purity": "error",
    "react/immutability": "error",
    "react/preserve-manual-memoization": "warn",
    "react/void-use-memo": "warn",
  },
  env: { builtin: true, browser: true },
} satisfies OxlintConfig;
