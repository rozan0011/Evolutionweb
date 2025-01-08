import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/', // Set the base path for your application
    build: {
        outDir: 'dist', // Specify the output directory for the build
        sourcemap: true, // Enable sourcemaps for easier debugging
        rollupOptions: {
            output: {
                entryFileNames: '[name].[hash].js', // Customize entry file names
                chunkFileNames: '[name].[hash].js', // Customize chunk file names
                assetFileNames: '[name].[hash][extname]', // Customize asset file names
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'; // Create a separate chunk for vendor libraries
                    }
                },
            },
        },
    },
    server: {
        port: 3000, // Specify the port for the development server
        open: true, // Automatically open the app in the browser
    },
});