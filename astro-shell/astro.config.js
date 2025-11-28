import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
    output: "server",        // ⬅ forces SSR
    integrations: [react()],
    server: {
        port: 4321
    }
});
