import { assertEquals } from "../../dev_deps.ts";
import { loadConfig } from "../../src/config.ts";

Deno.test("[config] get config without config file", async () => {
  const config = await loadConfig();
  const expected = {
    cwd: "./",
    entryPoint: "",
    excludes: [],
    runtimeOptions: [],
  };

  assertEquals(config, expected);
});
