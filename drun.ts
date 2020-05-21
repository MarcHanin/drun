import { loadConfig } from "./src/config.ts";
import { CommandsFactory } from "./src/commands_factory.ts";

async function main() {
  const config = await loadConfig();
  const command = CommandsFactory.create(Deno.args, config);
  await command.run();
}

if (import.meta.main) {
  try {
    await main();
  } catch (err) {
    console.error(err); // TODO Change to Deno.log
    Deno.exit(1);
  }
}
