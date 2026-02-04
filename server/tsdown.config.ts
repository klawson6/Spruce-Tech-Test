import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./index.ts"],
  copy: [{ from: "public", to: "dist" }],
});
