import { readJson } from "../deps.ts";
import { DrunConfig } from "./interfaces/types.ts";

const DEFAULT_CONFIG_PATH = "./drun.json";

const DEFAULT_CONFIG = {
  cwd: "./",
  entryPoint: "",
  excludes: [],
  runtimeOptions: [],
};

/**
 * Load configuration
 * @returns Drun configuration
 */
export const loadConfig = async (): Promise<DrunConfig> => {
  try {
    const config = await readJson(DEFAULT_CONFIG_PATH) as DrunConfig;

    return config;
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }

    return DEFAULT_CONFIG;
  }
};
