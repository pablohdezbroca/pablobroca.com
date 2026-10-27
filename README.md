# Pablo Broca — Ingeniero en Sistemas
## Sitio Web Personal Oficial (https://pablobroca.com/)

Versión limpia, optimizada y lista para producción. Diseño One Page astronómico, visual e interactivo centrado en la identidad del astronauta, con canal directo a WhatsApp y enlace a KALTEK.TECH.

---

## 🚀 Despliegue en Servidor Web (cPanel / Apache / Nginx / FTP)

Los archivos listos para producción se encuentran en la carpeta `dist/` (y comprimidos en `pablobroca-produccion.zip`).

### Pasos de Despliegue:
1. Descomprime `pablobroca-produccion.zip` (o copia el contenido de la carpeta `dist/`).
2. Sube todos los archivos a la raíz pública de tu servidor de hosting (usualmente `public_html/` en cPanel o `/var/www/html/` en VPS/Apache/Nginx).
3. Asegúrate de incluir los siguientes archivos y carpetas:
   - `index.html` (Página principal optimizada)
   - `assets/` (CSS minificado, JavaScript y recursos gráficos)
   - `logo.jpg` (Logo oficial del astronauta)
   - `favicon.jpg` (Favicon del sitio)
   - `robots.txt` y `sitemap.xml` (SEO técnico)
4. ¡Listo! La página no requiere Node.js en el servidor para funcionar.

---

## 🛠️ Desarrollo y Modificaciones Futuras

Si en el futuro deseas realizar cambios en el código fuente:

1. **Requisitos locales:** Node.js (v18 o superior).
2. **Instalación de dependencias:**
   ```bash
   npm install
   ```
3. **Servidor de desarrollo local:**
   ```bash
   npm run dev
   ```
4. **Compilación para producción:**
   ```bash
   npm run build
   ```
   Esto regenera automáticamente la carpeta `dist/` optimizada.

---

## 📱 Configuración de Contacto y Enlaces

- **WhatsApp:** `+52 998 158 1510` (configurado en `src/data/portfolioData.ts`).
- **KALTEK.TECH:** `https://kaltek.tech/`.
- **Identidad:** Conserva el logo original del astronauta (`/logo.jpg`).
