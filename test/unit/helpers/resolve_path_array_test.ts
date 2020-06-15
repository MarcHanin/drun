import { assertEquals, assert, existsSync } from "../../../dev_deps.ts";
import { resolvePathArray } from "../../../src/helpers/resolve_path_array.ts";

const SCOPE = "helpers/resolve_path_array";

Deno.test(`[${SCOPE}] Resolve path`, async () => {
  const existingFile = "./test/data/file_to_ignore.ts";
  const resolvedPaths = await resolvePathArray([existingFile]);
  const expectedLength = 1;

  assertEquals(resolvedPaths.length, expectedLength);
  assert(existsSync(resolvedPaths[0]));
});

Deno.test(`[${SCOPE}] Skip unresolved paths`, async () => {
  const badFile = "./test/data/a/b";
  const resolvedPaths = await resolvePathArray([badFile]);
  const expectedLength = 0;

  assertEquals(resolvedPaths.length, expectedLength);
});

Deno.test(`[${SCOPE}] Resolve path list`, async () => {
  const fileList = [
    "./test/data/file_to_ignore.ts",
    "./bad/file",
    "./test/data/second_file_to_ignore.ts",
    "./test/data",
  ];
  const resolvedPaths = await resolvePathArray(fileList);
  const expectedLenght = 3;

  assertEquals(resolvedPaths.length, expectedLenght);
  resolvedPaths.forEach((path) => assert(existsSync(path)));
});
