import { Help, Watch, Command } from "./commands/index.ts";
import { DrunConfig } from "./interfaces/types.ts";

export class CommandsFactory {
  /**
   * Create an instance of command
   *
   * @param args CLI arguments
   * @param config Drun config
   */
  public static create(args: string[], config: DrunConfig): Command {
    const command = args[0];

    if (command === "help") {
      return new Help();
    }

    return new Watch(args, config);
  }
}
