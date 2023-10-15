import path from 'path'
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),

        react(),
    ],

    resolve: {
        alias: {
            'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.js'),
        },
    },

    optimizeDeps: {
        include: ['tailwind.config.js'],
    },
})
