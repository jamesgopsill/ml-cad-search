import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	build: {
		outDir: "docs",
		emptyOutDir: true,
		target: "ESNext",
	},
})
