import { extname } from "../../../../deps.ts";
import { DrunConfigValidationError } from "../../../errors/drun_config_validation_error.ts";

export const ENTRY_POINT_ALLOWED_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
];

/**
 * Validate test command options
 * @param options Options to validate
 */
export function optionsValidation(options: any): void {
  if (options.excludes && !Array.isArray(options.excludes)) {
    throw new DrunConfigValidationError("Excludes must be an array");
  }

  if (!options.cwd && !options.entryPoint) {
    throw new DrunConfigValidationError(
      "At least one of CWD or entry point is required",
    );
  }

  if (options.cwd && typeof options.cwd !== "string") {
    throw new DrunConfigValidationError("CWD must be a string");
  }

  if (options.entryPoint && typeof options.entryPoint !== "string") {
    throw new DrunConfigValidationError("Entry point must be a string");
  }

  if (
    options.entryPoint &&
    !ENTRY_POINT_ALLOWED_EXTENSIONS.includes(extname(options.entryPoint))
  ) {
    throw new DrunConfigValidationError(
      `Entry point must be one of the following types: ${
        ENTRY_POINT_ALLOWED_EXTENSIONS.join(",")
      }`,
    );
  }

  if (options.runtimeOptions && !Array.isArray(options.runtimeOptions)) {
    throw new DrunConfigValidationError("Runtime options must be an array");
  }
}
