import { readJson } from './deps.ts';
import { Config } from './interfaces/config.ts';
import { DrunConfigValidationError } from './errors/drunConfigValidationError.ts';

const DEFAULT_CONFIG_PATH = './drun.json';

const DEFAULT_CONFIG: Config = {
  cwd: './',
  entryPoint: '',
  excludes: [],
};

/**
 * Validate configuration object
 *
 * @param config - configuration object to be validated
 */
const validateConfig = (config: any) => {
  if (config.excludes && !Array.isArray(config.excludes)) {
    throw new DrunConfigValidationError('Excludes must be an array');
  }

  if (config.cwd && typeof config.cwd !== 'string') {
    throw new DrunConfigValidationError('CWD must be a string');
  }

  if (config.entryPoint && typeof config.entryPoint !== 'string') {
    throw new DrunConfigValidationError('Entry point must be a string');
  }
}

/**
 * Resolve a list of paths
 *
 * @param paths - List of paths to resolve
 */
const resolvePaths = async (paths: string[]): Promise<string[]> => {
  const pathsToResolve = paths.map(path => Deno.realpath(path));
  const resolvedPaths = await Promise.allSettled(pathsToResolve);

  const fulfilledPromises = resolvedPaths
    .filter(result => result.status === 'fulfilled') as any;

  return fulfilledPromises
    .map((res: PromiseFulfilledResult<string>) => res.value)
};

/**
 * Load configuration
 */
export const loadConfig = async (): Promise<Config> => {
  try {
    const config = await readJson(DEFAULT_CONFIG_PATH) as Config;
    validateConfig(config);

    if (config.excludes) {
      config.excludes = await resolvePaths(config.excludes);
    }

    return {
      ...DEFAULT_CONFIG,
      ...config,
    };
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return DEFAULT_CONFIG;
    }

    throw err;
  }
};
