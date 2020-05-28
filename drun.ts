import { log } from "./src/deps.ts";
import { loadConfig } from "./src/config.ts";
import { CommandsFactory } from "./src/commands_factory.ts";

async function main() {
  const config = await loadConfig();
  const command = CommandsFactory.create(Deno.args, config);
  await command.run();
}

const logger = log.getLogger();

if (import.meta.main) {
  try {
    await main();
  } catch (err) {
    logger.error(err);
    Deno.exit(1);
  }
}
