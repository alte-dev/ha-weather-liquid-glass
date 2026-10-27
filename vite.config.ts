import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'src/ios27-weather-card.ts'),
      name: 'WeatherLiquidGlassCard',
      fileName: () => 'weather-liquid-glass-card.js',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
