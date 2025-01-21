/// <reference types="vitest/config" />

import { defineConfig } from "vite";

export default defineConfig({
  test: { typecheck: { enabled: true } },
});
