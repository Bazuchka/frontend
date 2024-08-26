import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    base: "/",
    plugins: [
        svgr(),
        react(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
        }),
        viteTsconfigPaths(),
    ],
    publicDir: "public",
    server: {
        port: 3000,
        open: true,
        strictPort: true,
    },
    preview: {
        port: 3000,
        open: true,
        strictPort: true,
    },
    build: {
        outDir: "./build",
        target: "ES2022",
    },
});
