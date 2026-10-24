import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { developmentDimensions, educationalModel, pillars } from "../lib/academy-content.ts";

const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const ast = ts.createSourceFile("page.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function elements(tag) {
  const found = [];
  function visit(node) {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(ast) === tag
    ) found.push(node);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return found;
}

function attribute(element, name) {
  const attr = element.attributes.properties.find(
    (item) => ts.isJsxAttribute(item) && item.name.getText(ast) === name,
  );
  return attr?.initializer && ts.isStringLiteral(attr.initializer) ? attr.initializer.text : undefined;
}

test("home contains eight named sections in the institutional narrative order", () => {
  assert.deepEqual(elements("section").map((section) => attribute(section, "id")), [
    "inicio", "mision", "theodromia", "desarrollo", "modelo", "vision", "origen", "explorar",
  ]);
  assert.equal(elements("h1").length, 1);
  for (const section of elements("section")) {
    const heading = attribute(section, "aria-labelledby");
    assert.ok([...elements("h1"), ...elements("h2")].some((el) => attribute(el, "id") === heading));
  }
});

test("homepage CTAs lead to existing detail routes without simulating admission", () => {
  const destinations = elements("Link").map((link) => attribute(link, "href"));
  assert.ok(destinations.includes("/filosofia"));
  assert.ok(destinations.includes("/formacion"));
  assert.ok(destinations.includes("/historia"));
  assert.ok(!destinations.includes("/admision"));
  for (const href of destinations) {
    assert.ok(existsSync(new URL(`../app${href}/page.tsx`, import.meta.url)), href);
  }
});

test("institutional content keeps seven pillars, eight dimensions and four learning components", () => {
  assert.equal(pillars.length, 7);
  assert.equal(developmentDimensions.length, 8);
  assert.equal(educationalModel.length, 4);
  for (const item of [...pillars, ...developmentDimensions]) {
    assert.ok(item.name && item.description);
  }
  for (const item of educationalModel) assert.ok(item.title && item.text);
});
