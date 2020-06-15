import { Watch } from "../../../../src/commands/watch/command.ts";
import { assertEquals } from "../../../../dev_deps.ts";

function getConfig() {
  return {
    entryPoint: "./main.ts",
    cwd: "./",
    excludes: [],
    runtimeOptions: [],
  };
}

Deno.test("[watch] parse help argument", () => {
  const rawArgs = ["--help"];
  const config = getConfig();
  const watch = new Watch(rawArgs, config);
  const expected = { help: true };

  // @ts-ignore
  const args = watch.parseArguments();

  assertEquals(args, expected);
});

Deno.test("[watch] parse options arguments", () => {
  const rawArgs = [
    "--entryPoint=main.ts",
    "--cwd=./",
    "--runtimeOptions=--allow-net,--allow-read",
  ];
  const config = getConfig();
  const watch = new Watch(rawArgs, config);
  const expected = {
    entryPoint: "main.ts",
    cwd: "./",
    runtimeOptions: [
      "--allow-net",
      "--allow-read",
    ],
  };

  // @ts-ignore
  const args = watch.parseArguments();

  assertEquals(args, expected);
});
