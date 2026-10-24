import assert from "node:assert/strict";
import test from "node:test";

const base = process.env.PRODUCTION_TEST_URL;
const routes = ["/", "/filosofia", "/formacion", "/historia", "/admision"];
const languages = { es: "es-AR", en: "en-US", it: "it-IT", fr: "fr-FR" };

function get(path, locale = "es") {
  return fetch(new URL(path, base), {
    headers: { cookie: `va_locale=${locale}` },
    signal: AbortSignal.timeout(15000),
  });
}

test("production routes, locale metadata and response headers", { skip: !base }, async () => {
  for (const [locale, language] of Object.entries(languages)) {
    for (const route of routes) {
      const response = await get(route, locale);
      assert.equal(response.status, 200, `${locale} ${route}`);
      assert.equal(response.headers.get("x-powered-by"), null);
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
      assert.ok(response.headers.get("permissions-policy")?.includes("camera=()"));
      assert.match(response.headers.get("cache-control") ?? "", /private|no-store/);
      const html = await response.text();
      assert.ok(html.includes(`<html lang="${language}"`), `${locale} ${route}: lang`);
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${locale} ${route}: h1`);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      assert.ok(canonical, `${locale} ${route}: canonical missing`);
      assert.equal(new URL(canonical).href, new URL(route, "https://valmontacademy.com").href);
      assert.match(html, /property="og:title" content="[^"]+"/);
      assert.match(html, /name="description" content="[^"]+"/);
      if (route === "/formacion" || route === "/admision") {
        const message = {
          es: "Próximamente...",
          en: "Coming soon...",
          it: "Prossimamente...",
          fr: "Prochainement...",
        }[locale];
        const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
        assert.ok(main, `${locale} ${route}: main missing`);
        assert.equal(main.replace(/<[^>]*>/g, "").trim(), message);
      }
    }
  }
});

test("production sitemap, robots, icon, social image and missing routes", { skip: !base }, async () => {
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.equal((xml.match(/<loc>/g) ?? []).length, routes.length);
  for (const route of routes) assert.ok(xml.includes(new URL(route, "https://valmontacademy.com").href));
  const robots = await get("/robots.txt");
  assert.equal(robots.status, 200);
  assert.ok((await robots.text()).includes("Sitemap: https://valmontacademy.com/sitemap.xml"));
  for (const path of ["/icon.png", "/opengraph-image"]) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /image\/png/);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.subarray(1, 4).toString(), "PNG", path);
    if (path === "/opengraph-image") {
      assert.equal(bytes.readUInt32BE(16), 1200);
      assert.equal(bytes.readUInt32BE(20), 630);
    }
  }
  const missing = await get("/this-page-does-not-exist");
  assert.equal(missing.status, 404);
  const missingHtml = await missing.text();
  assert.ok(missingHtml.includes("Página no encontrada"));
  assert.match(missingHtml, /name="robots" content="[^"]*noindex/);
  const invalid = await get("/", "invalid");
  assert.ok((await invalid.text()).includes('<html lang="es-AR"'));
});
