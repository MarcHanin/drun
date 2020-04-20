import { DrunRequiredEntryPointError } from './src/errors/drunRequiredEntryPoint.ts';
import { Runner } from './src/runner.ts';
import { loadConfig } from './src/config.ts';

/**
 * Parse program arguments
 */
function parseArguments() {
  const config: any = {};

  Deno.args.forEach((arg) => {
    if (arg.includes('--entryPoint=')) {
      config.entryPoint = arg.split('=')[1];
    }

    if (arg.includes('--cwd=')) {
      config.cwd = arg.split('=')[1];
    }
  });

  return config;
}

async function main() {
  const configFile = await loadConfig();
  const config = {
    ...configFile,
    ...parseArguments(),
  };

  if (!config.entryPoint) {
    throw new DrunRequiredEntryPointError('Entry point is required');
  }

  const resolvedEntryPoint = await Deno.realpath(config.entryPoint);
  const runner = new Runner(resolvedEntryPoint, config);

  await runner.run();
}

if (import.meta.main) {
  try {
    await main();
  } catch (err) {
    console.error(err); // TODO Change to Deno.log
    Deno.exit(1);
  }
}
