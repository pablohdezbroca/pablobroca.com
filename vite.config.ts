import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Plugin to generate a 100% self-contained index.html and index.php for OpenLiteSpeed/Apache
// Eliminates any HTTP 403 Forbidden issues on subdirectories or external JS/CSS files
function openLiteSpeedBundlePlugin(): Plugin {
  return {
    name: 'openlitespeed-bundle',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname ?? '.', 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      let html = fs.readFileSync(indexHtmlPath, 'utf-8');

      // Inline CSS files referenced in index.html
      html = html.replace(
        /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']\.?\/?([^"']+\.css)["'][^>]*>/gi,
        (match, cssRelPath) => {
          const cssFullPath = path.join(distDir, cssRelPath);
          if (fs.existsSync(cssFullPath)) {
            const cssContent = fs.readFileSync(cssFullPath, 'utf-8');
            return `<style>${cssContent}</style>`;
          }
          return match;
        }
      );

      // Inline JS module files referenced in index.html
      html = html.replace(
        /<script\s+[^>]*src=["']\.?\/?([^"']+\.js)["'][^>]*><\/script>/gi,
        (match, jsRelPath) => {
          const jsFullPath = path.join(distDir, jsRelPath);
          if (fs.existsSync(jsFullPath)) {
            const jsContent = fs.readFileSync(jsFullPath, 'utf-8');
            // Escape any closing script tags inside JS string literals
            const safeJs = jsContent.replace(/<\/script>/gi, '<\\/script>');
            return `<script type="module">${safeJs}</script>`;
          }
          return match;
        }
      );

      // Move script from <head> to end of <body> so #root exists when module executes
      const scriptMatch = html.match(/<script type="module">[\s\S]*?<\/script>/);
      if (scriptMatch) {
        const scriptTag = scriptMatch[0];
        html = html.replace(scriptTag, () => '');
        html = html.replace('</body>', () => `${scriptTag}\n  </body>`);
      }

      // Write self-contained index.html
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');

      // Write clean index.php that streams index.html safely without PHP short_open_tag conflicts
      const phpContent = `<?php
/**
 * Pablo Broca — Ingeniero en Sistemas
 * Sitio Personal One Page (https://pablobroca.com/)
 * Optimizado para OpenLiteSpeed / Apache
 */
header('Content-Type: text/html; charset=UTF-8');
readfile(__DIR__ . '/index.html');
exit;
`;
      fs.writeFileSync(path.join(distDir, 'index.php'), phpContent, 'utf-8');

      // Remove external JS/CSS and subdirectories so dist/ has only flat root files (zero 403 subfolder issues)
      for (const file of ['app.js', 'index.css']) {
        const p = path.join(distDir, file);
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
      const assetsSubdir = path.join(distDir, 'assets');
      if (fs.existsSync(assetsSubdir)) {
        fs.rmSync(assetsSubdir, { recursive: true, force: true });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), openLiteSpeedBundlePlugin()],
    build: {
      assetsDir: '',
      rollupOptions: {
        output: {
          entryFileNames: 'app.js',
          chunkFileNames: 'chunk-[name].js',
          assetFileNames: '[name][extname]',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname ?? '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
