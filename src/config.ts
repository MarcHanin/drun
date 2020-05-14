import { readJson, extname } from "./deps.ts";
import { Config } from "./interfaces/types.ts";
import { DrunConfigValidationError } from "./errors/drun_config_validation_error.ts";

const DEFAULT_CONFIG_PATH = "./drun.json";

const DEFAULT_CONFIG = {
  cwd: "./",
  entryPoint: "",
  excludes: [],
};

const ENTRY_POINT_ALLOWED_EXTENSIONS = [
  ".js",
  ".ts",
];

/**
 * Resolve a list of paths
 *
 * @param paths - List of paths to resolve
 */
const resolvePaths = async (paths: string[]): Promise<string[]> => {
  const pathsToResolve = paths.map((path) => Deno.realPath(path));
  const resolvedPaths = await Promise.allSettled(pathsToResolve);

  const fulfilledPromises = resolvedPaths
    .filter((result) => result.status === "fulfilled") as any;

  return fulfilledPromises
    .map((res: PromiseFulfilledResult<string>) => res.value);
};

/**
 * Validate configuration object
 *
 * @param config - configuration object to be validated
 */
const validateConfig = (config: any) => {
  if (config.excludes && !Array.isArray(config.excludes)) {
    throw new DrunConfigValidationError("Excludes must be an array");
  }

  if (config.cwd && typeof config.cwd !== "string") {
    throw new DrunConfigValidationError("CWD must be a string");
  }

  if (!config.entryPoint) {
    throw new DrunConfigValidationError("Entry point is required");
  }

  if (config.entryPoint && typeof config.entryPoint !== "string") {
    throw new DrunConfigValidationError("Entry point must be a string");
  }

  if (!ENTRY_POINT_ALLOWED_EXTENSIONS.includes(extname(config.entryPoint))) {
    throw new DrunConfigValidationError(
      "Entry point must be one of the following types: .js, .ts",
    );
  }
};

/**
 * Load configuration
 */
export const loadConfig = async (args: any): Promise<Config> => {
  let config: Config = DEFAULT_CONFIG;

  try {
    const configFile = await readJson(DEFAULT_CONFIG_PATH) as any;

    config = {
      ...config,
      ...configFile,
      ...args,
    };
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }

    config = {
      ...config,
      ...args,
    };
  }

  if (config.excludes) {
    config.excludes = await resolvePaths(config.excludes);
  }

  validateConfig(config);

  return config;
};
