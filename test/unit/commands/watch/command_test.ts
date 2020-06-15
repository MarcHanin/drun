import { Watch } from "../../../../src/commands/watch/command.ts";
import { assertEquals } from "../../../../dev_deps.ts";

const SCOPE = "commands/watch/command";

function getConfig() {
  return {
    entryPoint: "./main.ts",
    cwd: "./",
    excludes: [],
    runtimeOptions: [],
  };
}

Deno.test(`[${SCOPE}] parse help argument`, () => {
  const rawArgs = ["--help"];
  const config = getConfig();
  const watch = new Watch(rawArgs, config);
  const expected = { help: true };

  // @ts-ignore
  const args = watch.parseArguments();

  assertEquals(args, expected);
});

Deno.test(`[${SCOPE}] parse options arguments`, () => {
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
