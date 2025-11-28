import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        cors: true
    },
    build: {
        lib: {
            entry: "src/main.jsx",
            name: "RemoteViteApp",
            fileName: "remote-vite-app",
            formats: ["iife"]
        },
        rollupOptions: {
            // no externals, bundle everything
        }
    }
});
