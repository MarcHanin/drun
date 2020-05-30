import { Help, Watch } from "../../src/commands/index.ts";
import { CommandsFactory } from "../../src/commands_factory.ts";
import { assert } from "../../dev_deps.ts";

Deno.test("[commands_factory] Create help command instance", () => {
  const args = ["help"];
  const config = {} as any; // TODO Replace that
  const command = CommandsFactory.create(args, config);

  assert(command instanceof Help);
});

Deno.test("[commands_factory] Create watch command instance", () => {
  const args = ["watch"];
  const config = {} as any; // TODO Replace that
  const command = CommandsFactory.create(args, config);

  assert(command instanceof Watch);
});

Deno.test("[commands_factory] Create watch command instance by default", () => {
  const args = [] as string[];
  const config = {} as any; // TODO Replace that
  const command = CommandsFactory.create(args, config);

  assert(command instanceof Watch);
});
