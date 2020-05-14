import { Runner } from "./src/runner.ts";
import { loadConfig } from "./src/config.ts";
import { parseArguments } from "./src/parse_arguments.ts";

async function main() {
  const args = parseArguments(Deno.args);
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
