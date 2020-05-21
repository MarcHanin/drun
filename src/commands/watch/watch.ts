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
  constructor(
    private args: string[],
    private config: DrunConfig,
  ) {}

  /**
   * Parse CLI arguments
   * @returns Watch command options
   */
  private parseArguments(): WatchOptions {
    const options: WatchOptions = {};

    this.args.forEach((arg) => {
      if (arg.includes("--entryPoint=")) { // TODO Improve this code
        const entryPoint = arg.split("=")[1];
        options.entryPoint = entryPoint;
      } else if (arg.includes("--cwd=")) {
        const cwd = arg.split("=")[1];
        options.cwd = cwd;
      } else if (arg.includes("--runtimeOptions")) {
        const runtimeOption = arg.split("=")[1].split(",");
        options.runtimeOptions = runtimeOption;
      } else if (arg.includes("--help")) {
        options.help = true;
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
