import { defineConfig } from "vite-plus";

import { fmt, typescript } from "./src/index.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  pack: {
    entry: ["src/index.ts", "src/lint/index.ts", "src/fmt/index.ts"],
    format: ["esm"],
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    dts: {
      generator: "tsgo",
    },
    exports: true,
  },
  lint: {
    ...typescript,
    options: {
      ...typescript.options,
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt,
});
