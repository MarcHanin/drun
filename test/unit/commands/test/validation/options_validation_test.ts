import { assertThrows } from "../../../../../dev_deps.ts";
import {
  optionsValidation,
  ENTRY_POINT_ALLOWED_EXTENSIONS,
} from "../../../../../src/commands/test/validation/options_validation.ts";
import { DrunConfigValidationError } from "../../../../../src/errors/drun_config_validation_error.ts";

const SCOPE = "commands/test/validation/options_validation";

Deno.test(`[${SCOPE}] throw error if excludes is not an array`, () => {
  const options = {
    excludes: "bad exclude",
  };

  assertThrows(
    () => {
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Excludes must be an array",
  );
});

Deno.test(`[${SCOPE}] throw error if entryPoint and CWD are both undefined`, () => {
  const options = {};

  assertThrows(
    () => {
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "At least one of CWD or entry point is required",
  );
});

Deno.test(`[${SCOPE}] throw error if CWD is not a string`, () => {
  const options = { cwd: 1 };

  assertThrows(
    () => {
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "CWD must be a string",
  );
});

Deno.test(`[${SCOPE}] throw error if entryPoint is not a string`, () => {
  const options = { entryPoint: 1 };

  assertThrows(
    () => {
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Entry point must be a string",
  );
});

Deno.test(`[${SCOPE}] throw error if entry point has invalid file extension`, () => {
  const options = { entryPoint: "test.rs" };

  assertThrows(
    () => {
      optionsValidation(options);
    },
    DrunConfigValidationError,
    `Entry point must be one of the following types: ${ENTRY_POINT_ALLOWED_EXTENSIONS}`,
  );
});

Deno.test(`[${SCOPE}] throw error if runtimeOptions is not an array`, () => {
  const options = {
    entryPoint: "test.ts",
    runtimeOptions: "--allow-net",
  };

  assertThrows(
    () => {
      optionsValidation(options);
    },
    DrunConfigValidationError,
    "Runtime options must be an array",
  );
});

Deno.test(`[${SCOPE}] valid options`, () => {
  const options = {
    entryPoint: "valid_test.ts",
    cwd: "./",
    excludes: [
      "./test/data/file_to_exclude.ts",
    ],
    runtimeOptions: [
      "--allow-net",
      "--allow-read",
    ],
  };

  optionsValidation(options);
});
