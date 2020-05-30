import { assertThrows } from "../../../../../dev_deps.ts";
import { optionsValidation } from "../../../../../src/commands/watch/validation/options_validation.ts";
import { DrunConfigValidationError } from "../../../../../src/errors/drun_config_validation_error.ts";

Deno.test("[options_validation] throw error if excludes is not an array", () => {
  const options = {
    excludes: "bad exclude",
  };

  assertThrows(
    () => {
      // @ts-ignore
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Excludes must be an array",
  );
});

Deno.test("[options_validation] throw error if CWD is not a string", () => {
  const options = {
    cwd: {},
  };

  assertThrows(
    () => {
      // @ts-ignore
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "CWD must be a string",
  );
});

Deno.test("[options_validation] throw error if no entryPoint was provided", () => {
  const options = {};

  assertThrows(
    () => {
      // @ts-ignore
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Entry point is required",
  );
});

Deno.test("[options_validation] throw error if entry point is not a string", () => {
  const options = {
    entryPoint: 10,
  };

  assertThrows(
    () => {
      // @ts-ignore
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Entry point must be a string",
  );
});

Deno.test("[options_validation] throw error if entry point has a bad file extension", () => {
  const options = {
    entryPoint: "./myFile.rs",
  };

  assertThrows(
    () => {
      // @ts-ignore
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Entry point must be one of the following types: .js,.ts",
  );
});

Deno.test("[options_validation] throw error if runtimeOptions is not an array", () => {
  const options = {
    entryPoint: "./myFile.ts",
    runtimeOptions: "--allow-net",
  };

  assertThrows(
    () => {
      // @ts-ignore
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Runtime options must be an array",
  );
});

Deno.test("[options_validation] valid options", () => {
  const options = {
    excludes: [
      "./test/data/file_to_exclude.ts",
    ],
    cwd: "./",
    entryPoint: "./test.ts",
    runtimeOptions: [
      "--allow-net",
      "--allow-read",
    ],
  };

  // @ts-ignore
  optionsValidation(options);
});
