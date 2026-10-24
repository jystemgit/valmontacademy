# Valmont Academy

Sitio institucional con Next.js App Router, React y TypeScript, preparado para `https://valmontacademy.com`

## Entorno

- Node.js 24 LTS y npm, versión indicada también en `.nvmrc`
- Instalar con `npm ci` para respetar `package-lock.json`
- No requiere base de datos, claves de API ni variables de entorno para funcionar
- Las fuentes de `next/font/google` requieren acceso a Google durante el build; los archivos resultantes se sirven desde el propio sitio

## Validación y ejecución

```sh
npm ci
npm run check
npm start
```

`check` ejecuta las pruebas, ESLint, el build y TypeScript

En desarrollo: `npm run dev -- --port 3001`

Con el servidor de producción ya iniciado, verificar sus respuestas HTTP:

```sh
PRODUCTION_TEST_URL=http://127.0.0.1:3000 npm run test:production
```

Las pruebas de producción se omiten en `npm test` si no se define `PRODUCTION_TEST_URL`

## Despliegue

Usar un hosting compatible con Next.js y Node.js, no un alojamiento de HTML estático

- Comando de instalación: `npm ci`
- Comando de build: `npm run check`
- Comando de inicio, si el proveedor lo necesita: `npm start`
- Puerto: Next.js respeta la variable `PORT` proporcionada por el hosting
- En un servidor Node propio, conservar el proyecto, `.next`, los recursos y las dependencias de ejecución
- Usar el mismo build validado para servir producción y reiniciar el proceso después de cada despliegue
- Configurar HTTPS en el proveedor o proxy antes de publicar
- Asociar `valmontacademy.com` al hosting y redirigir las variantes de dominio al dominio canónico
- No usar `npm run dev` como servidor de producción

Los cambios de idioma usan una cookie HTTP-only, SameSite Lax y Secure en producción, por lo que necesitan HTTPS fuera de localhost

Las cinco páginas se renderizan en servidor según la cookie de idioma, sin cambiar sus URLs ni inventar variantes `hreflang`; no almacenar HTML personalizado en una caché pública del proxy

## Verificación después del despliegue

- Ejecutar las pruebas HTTP con `PRODUCTION_TEST_URL=https://valmontacademy.com`
- Revisar navegación móvil, selector de cuatro idiomas y persistencia al recargar
- Comprobar favicon, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`, canonicals y página 404
- Confirmar que Formación y Admisión solo muestran «Próximamente...» en el contenido principal

## Alcance actual

Sin inscripciones, pagos, formularios ni servicios educativos operativos

La configuración del código no configura ni acredita DNS, hosting, certificados o despliegue público; esos pasos se realizan y verifican en el proveedor elegido
