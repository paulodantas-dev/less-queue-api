import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  dts: false,
  minify: true,
})
