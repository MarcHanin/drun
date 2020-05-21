import { extname } from "../../../deps.ts";
import { DrunConfigValidationError } from "../../../errors/drun_config_validation_error.ts";
import { DrunConfig } from "../../../interfaces/types.ts";

const ENTRY_POINT_ALLOWED_EXTENSIONS = [
  ".js",
  ".ts",
];

/**
 * Validate watch command options
 * @param options Options to validate
 */
export const optionsValidation = (options: DrunConfig): void => {
  if (options.excludes && !Array.isArray(options.excludes)) {
    throw new DrunConfigValidationError("Excludes must be an array");
  }

  if (options.cwd && typeof options.cwd !== "string") {
    throw new DrunConfigValidationError("CWD must be a string");
  }

  if (!options.entryPoint) {
    throw new DrunConfigValidationError("Entry point is required");
  }

  if (typeof options.entryPoint !== "string") {
    throw new DrunConfigValidationError("Entry point must be a string");
  }

  if (!ENTRY_POINT_ALLOWED_EXTENSIONS.includes(extname(options.entryPoint))) {
    throw new DrunConfigValidationError(
      `Entry point must be one of the following types: ${
        ENTRY_POINT_ALLOWED_EXTENSIONS.join(",")
      }`,
    );
  }

  if (options.runtimeOptions && !Array.isArray(options.runtimeOptions)) {
    throw new DrunConfigValidationError("Runtime options must be an array");
  }
};
