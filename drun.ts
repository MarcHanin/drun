import { Runner } from './src/runner.ts';
import { loadConfig } from './src/config.ts';

/**
 * Parse program arguments
 */
function parseArguments() {
  const args: any = {};

  Deno.args.forEach((arg) => {
    if (arg.includes('--entryPoint=')) {
      args.entryPoint = arg.split('=')[1];
    }

    if (arg.includes('--cwd=')) {
      args.cwd = arg.split('=')[1];
    }
  });

  return args;
}

async function main() {
  const args = parseArguments();
  const config = await loadConfig(args);
  const resolvedEntryPoint = await Deno.realPath(config.entryPoint);
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
