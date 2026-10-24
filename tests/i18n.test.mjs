import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { isLocale, locales, localeInfo, messages, translator } from "../lib/i18n.ts";

test("offers the same four languages in the reference order", () => {
  assert.deepEqual(locales.map((locale) => localeInfo[locale].label), [
    "Spanish", "English", "Italian", "French",
  ]);
  for (const locale of locales) assert.equal(isLocale(locale), true);
  for (const value of ["de", "", undefined, "__proto__"]) assert.equal(isLocale(value), false);
});

test("every message has three complete translations and preserves Spanish", () => {
  for (const [source, translations] of Object.entries(messages)) {
    assert.equal(translations.length, 3, source);
    assert.equal(translator("es")(source), source);
    for (const [index, locale] of ["en", "it", "fr"].entries()) {
      assert.ok(translations[index].trim().length > 0, `${locale}: ${source}`);
      assert.equal(translator(locale)(source), translations[index]);
    }
  }
});

test("missing translations are explicit errors, not silent Spanish fallbacks", () => {
  assert.throws(() => translator("en")("Missing copy"), /Missing en translation/);
});

test("page copy, metadata, accessible labels and content arrays have translations", () => {
  const files = [
    "app/page.tsx",
    "app/filosofia/page.tsx",
    "app/formacion/page.tsx",
    "app/historia/page.tsx",
    "app/admision/page.tsx",
    "app/not-found.tsx",
    "components/site-footer.tsx",
    "app/layout.tsx",
    "lib/navigation.ts",
    "lib/academy-content.ts",
  ];
  const expected = new Set();
  for (const file of files) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isCallExpression(node)) {
        if (node.expression.getText(ast) === "t" && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
          expected.add(node.arguments[0].text);
        }
        if (node.expression.getText(ast) === "pageMetadata") {
          node.arguments.slice(0, 2).forEach((arg) => {
            if (ts.isStringLiteral(arg)) expected.add(arg.text);
          });
        }
      }
      if (
        ts.isPropertyAssignment(node) &&
        ["title", "name", "description", "text", "label"].includes(node.name.getText(ast)) &&
        ts.isStringLiteral(node.initializer) &&
        node.initializer.text !== "Augusto Valmont"
      ) expected.add(node.initializer.text);
      if (ts.isVariableDeclaration(node) && node.name.getText(ast) === "dimensions" && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
        node.initializer.elements.forEach((item) => {
          if (ts.isStringLiteral(item)) expected.add(item.text);
        });
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
  for (const message of expected) {
    assert.ok(Object.hasOwn(messages, message), `Missing translation: ${message}`);
  }
});
