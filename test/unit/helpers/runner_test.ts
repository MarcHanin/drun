import { Runner } from "../../../src/helpers/runner.ts";
import { assert, existsSync } from "../../../dev_deps.ts";

const SCOPE = "helpers/runner";

Deno.test(`[${SCOPE}] get current working directory`, async () => {
  const command = "run";
  const options = {
    cwd: "./test/data",
  };
  const runner = new Runner(command, options);
  const cwd = await runner.getCwd();

  assert(existsSync(cwd));
});

Deno.test(`[${SCOPE}] should not reload if modify exluded file`, () => {
  const command = "run";
  const options = {
    excludes: [
      "./data/test/file_to_ignore.ts",
    ],
  };
  const runner = new Runner(command, options);
  const fakeFsEvent = {
    kind: "modify",
    paths: [
      "./data/test/file_to_ignore.ts",
    ],
  };

  // @ts-ignore
  const shouldReload = runner.shouldReload(fakeFsEvent);

  assert(!shouldReload);
});

Deno.test(`[${SCOPE}] should not reload with different event from modify`, () => {
  const command = "run";
  const options = {};
  const runner = new Runner(command, options);
  const fakeFsEvent = {
    kind: "create",
    paths: [
      "./data/test/file_to_ignore.ts",
    ],
  };

  // @ts-ignore
  const shouldReload = runner.shouldReload(fakeFsEvent);

  assert(!shouldReload);
});

Deno.test(`[${SCOPE}] should reload`, () => {
  const command = "run";
  const options = {};
  const runner = new Runner(command, options);
  const fakeFsEvent = {
    kind: "modify",
    paths: [
      "./data/test/file_to_ignore.ts",
    ],
  };

  // @ts-ignore
  const shouldReload = runner.shouldReload(fakeFsEvent);

  assert(shouldReload);
});
