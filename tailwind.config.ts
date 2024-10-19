import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            borderWidth: {
                "1.5": "1.5px"
            },
            spacing: {
                "128": "32rem"
            }
        }
    },
    plugins: []
} as Config;