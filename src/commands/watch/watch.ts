import { Command } from "../command.ts";
import { resolvePathArray } from "../../helpers/resolve_path_array.ts";
import { Runner } from "../../helpers/runner.ts";
import { optionsValidation } from "./validation/options_validation.ts";
import { HELP_TEMPLATE } from "./templates.ts";
import { DrunConfig } from "../../interfaces/types.ts";

interface WatchOptions {
  entryPoint?: string;
  cwd?: string;
  runtimeOptions?: string[];
  help?: boolean;
}

const DENO_RUN_COMMAND = "run";

export class Watch implements Command {
  constructor(private args: string[], private config: DrunConfig) {}

  /**
   * Parse CLI arguments
   * @returns Watch command options
   */
  private parseArguments(): WatchOptions {
    const options: WatchOptions = {};

    this.args.forEach((arg) => {
      if (/^--help/.test(arg) || /^-h/.test(arg)) {
        options.help = true;
      } else if (/^--.+=.+/.test(arg)) {
        const option = arg.match(/^--([^=]+)=([\s\S]*)$/);
        if (option === null) return;
        const [, key, value] = option;
        switch (key) {
          case "entryPoint":
            options.entryPoint = value;
            break;
          case "cwd":
            options.cwd = value;
            break;
          case "runtimeOptions":
            options.runtimeOptions = value.split(",");
            break;
        }
      }
    });

    return options;
  }

  /**
   * Display help for the watch command
   */
  public help(): void {
    console.log(HELP_TEMPLATE);
  }

  /**
   * Run drun watch command
   */
  public async run(): Promise<void> {
    const options = {
      ...this.config,
      ...this.parseArguments(),
    };

    if (options.help) {
      this.help();
      return;
    }

    optionsValidation(options);

    options.entryPoint = await Deno.realPath(options.entryPoint);

    if (options.excludes) {
      options.excludes = await resolvePathArray(options.excludes);
    }

    const runner = new Runner(DENO_RUN_COMMAND, options);
    await runner.run();
  }
}
