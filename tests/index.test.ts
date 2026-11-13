import { expect, test } from "vite-plus/test";

import * as fmtEntry from "../src/fmt/index.ts";
import * as root from "../src/index.ts";
import * as lintEntry from "../src/lint/index.ts";

const { base, react, typescript, vue } = lintEntry;

test("每个入口只导出自己的东西", () => {
  expect(Object.keys(lintEntry).toSorted()).toEqual(["base", "react", "typescript", "vue"]);
  expect(Object.keys(fmtEntry)).toEqual(["fmt"]);
  expect(Object.keys(root).toSorted()).toEqual(["base", "fmt", "react", "typescript", "vue"]);
});

test("presets 共享 categories 与 ignorePatterns", () => {
  for (const preset of [typescript, react, vue]) {
    expect(preset.categories).toEqual(base.categories);
    expect(preset.ignorePatterns).toBe(base.ignorePatterns);
  }
});

test("typescript 在 base 之上补 TS 规则", () => {
  expect(typescript.rules["no-debugger"]).toBe("error");
  expect(typescript.rules["typescript/no-explicit-any"]).toBe("warn");
});

test("react 开 react / jsx-a11y 插件并带上 hooks 规则", () => {
  expect(react.plugins).toContain("react");
  expect(react.plugins).toContain("jsx-a11y");
  expect(react.rules["react/rules-of-hooks"]).toBe("error");
});

test("vue 开 vue 插件", () => {
  expect(vue.plugins).toContain("vue");
});

test("lint 与 fmt 共用同一份 ignorePatterns", () => {
  expect(base.ignorePatterns).toBe(fmtEntry.fmt.ignorePatterns);
  expect(fmtEntry.fmt.ignorePatterns).toContain("**/dist/**");
  expect(fmtEntry.fmt.sortImports).toBe(true);
});
