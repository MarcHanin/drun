import { Help, Watch, Test, Command } from "./commands/index.ts";
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

    switch (command) {
      case "help":
        return new Help();

      case "test":
        return new Test(args, config);

      default:
        return new Watch(args, config);
    }
  }
}
