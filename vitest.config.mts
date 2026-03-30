import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/framework/src/components/**/__tests__/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/framework/src/components/**/*.{ts,tsx}"],
      exclude: ["packages/framework/src/components/**/__tests__/**"],
      thresholds: {
        lines: 90,
      },
    },
  },
});
