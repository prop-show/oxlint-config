import type { OxlintConfig } from "vite-plus/lint";

import { ignorePatterns } from "../core/ignore-patterns.ts";

/** 所有 preset 共用的基础规则。 */
export const base = {
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  ignorePatterns,
  options: {
    reportUnusedDisableDirectives: "warn",
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "no-implicit-coercion": "warn",
    "no-param-reassign": "warn",
    "no-throw-literal": "error",
    "no-unneeded-ternary": "warn",
    "no-useless-rename": "error",
    "object-shorthand": "warn",
    eqeqeq: ["error", "smart"],
    "no-unused-vars": [
      "error",
      { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
} satisfies OxlintConfig;
