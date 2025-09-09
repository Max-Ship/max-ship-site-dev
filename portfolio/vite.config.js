import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

export default defineConfig(({ command }) => {
    return {
        plugins: [
            command === 'build' && obfuscatorPlugin({
                options: {
                    compact: true,
                    controlFlowFlattening: true,
                    deadCodeInjection: true,
                    stringArray: true,
                    stringArrayShuffle: true,
                },
            }),
        ].filter(Boolean),
        css: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: [
                            '> 1%',
                            'last 4 versions',
                            'not dead',
                            'Firefox ESR',
                            'iOS >= 12',
                            'Chrome >= 60',
                            'Safari >= 11',
                            'Edge >= 16'
                        ],
                        grid: true,
                        flexbox: 'no-2009',
                    }),
                ],
            },
        },
        build: {
            target: 'esnext',
            minify: 'esbuild',
            sourcemap: false,
            cssCodeSplit: false,
            assetsDir: 'assets',
            rollupOptions: {
                output: {
                    manualChunks: () => 'index.js',
                },
            },
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        },
        server: {
            port: 3000,
            open: true,
        },
    }
})
