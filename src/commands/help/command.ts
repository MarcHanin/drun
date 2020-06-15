import { Command } from "../command.ts";
import { HELP_TEMPLATE } from "./templates.ts";

export class Help implements Command {
  /**
   * Run drun help command
   */
  public run(): void {
    console.log(HELP_TEMPLATE);
  }
}
