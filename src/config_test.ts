import { assertEquals, assertThrowsAsync } from "../dev_deps.ts";
import { loadConfig } from "./config.ts";
import { DrunConfigValidationError } from "./errors/drun_config_validation_error.ts";

Deno.test("[config] valid config with entry point", async () => {
  const config = await loadConfig({ entryPoint: "testFile.ts" });
  const expected = {
    cwd: "./",
    entryPoint: "testFile.ts",
    excludes: [],
  };

  assertEquals(config, expected);
});

Deno.test("[config] valid config with excludes", async () => {
  const config = await loadConfig(
    {
      entryPoint: "testFile.ts",
      excludes: ["src/testData/file_to_exclude.ts"],
    },
  );
  const expected = 1;

  assertEquals(config.excludes.length, expected);
});

Deno.test("[config] valid config with CWD", async () => {
  const config = await loadConfig(
    { entryPoint: "testFile.ts", cwd: "./testData" },
  );
  const expected = {
    cwd: "./testData",
    entryPoint: "testFile.ts",
    excludes: [],
  };

  assertEquals(config, expected);
});

Deno.test("[config] invalid cwd", async () => {
  assertThrowsAsync(
    async () => {
      await loadConfig({ entryPoint: "testFile.ts", cwd: 1 });
    },
    DrunConfigValidationError,
    "CWD must be a string",
  );
});

Deno.test("[config] missing entryPoint", async () => {
  assertThrowsAsync(
    async () => {
      await loadConfig({});
    },
    DrunConfigValidationError,
    "Entry point is required",
  );
});

Deno.test("[config] invalid entryPoint", async () => {
  assertThrowsAsync(
    async () => {
      await loadConfig({ entryPoint: 1 });
    },
    DrunConfigValidationError,
    "Entry point must be a string",
  );
});

Deno.test("[config] invalid entryPoint extension", async () => {
  assertThrowsAsync(
    async () => {
      await loadConfig({ entryPoint: "badEntryPoint.rs" });
    },
    DrunConfigValidationError,
    "Entry point must be one of the following types: .js, .ts",
  );
});
