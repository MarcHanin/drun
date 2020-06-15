import { Help } from "../../src/commands/help/command.ts";
import { Watch } from "../../src/commands/watch/command.ts";
import { CommandsFactory } from "../../src/commands_factory.ts";
import { assert } from "../../dev_deps.ts";

const SCOPE = "commands_factory";

Deno.test(`[${SCOPE}] Create help command instance`, () => {
  const args = ["help"];
  const config = {} as any; // TODO Replace that
  const command = CommandsFactory.create(args, config);

  assert(command instanceof Help);
});

Deno.test(`[${SCOPE}] Create watch command instance`, () => {
  const args = ["watch"];
  const config = {} as any; // TODO Replace that
  const command = CommandsFactory.create(args, config);

  assert(command instanceof Watch);
});

Deno.test(`[${SCOPE}] Create watch command instance by default`, () => {
  const args = [] as string[];
  const config = {} as any; // TODO Replace that
  const command = CommandsFactory.create(args, config);

  assert(command instanceof Watch);
});
