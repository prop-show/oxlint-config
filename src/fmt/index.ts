import type { OxfmtConfig } from "vite-plus/fmt";

import { ignorePatterns } from "../core/ignore-patterns.ts";

export const fmt = {
  endOfLine: "lf",
  insertFinalNewline: true,
  sortImports: true,
  sortPackageJson: true,
  ignorePatterns,
} satisfies OxfmtConfig;
