import { assertEquals } from "../dev_deps.ts";
import { parseArguments } from "./parse_arguments.ts";

Deno.test("[parseArguments] parse with empty arguments", () => {
  const args = [] as string[];
  const expected = {};

  assertEquals(parseArguments(args), expected);
});

Deno.test("[parseArguments] parse with unknown argument", () => {
  const args = ["--unknownArg=true"];
  const expected = {};

  assertEquals(parseArguments(args), expected);
});

Deno.test("[parseArguments] parse with entryPoint argument", () => {
  const args = ["--entryPoint=main.ts"];
  const expected = { entryPoint: "main.ts" };

  assertEquals(parseArguments(args), expected);
});

Deno.test("[parseArguments] parse with cwd argument", () => {
  const args = ["--cwd=cwdFolder"];
  const expected = { cwd: "cwdFolder" };

  assertEquals(parseArguments(args), expected);
});

Deno.test("[parseArguments] parse with all arguments", () => {
  const args = [
    "--entryPoint=main.ts",
    "--cwd=cwdFolder",
    "--unknownArg=true",
  ];
  const expected = {
    entryPoint: "main.ts",
    cwd: "cwdFolder",
  };

  assertEquals(parseArguments(args), expected);
});
