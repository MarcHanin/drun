import { Command } from "../command.ts";
import { resolvePathArray } from "../../helpers/resolve_path_array.ts";
import { Runner } from "../../helpers/runner.ts";
import { optionsValidation } from "./validation/options_validation.ts";
import { DrunConfig } from "../../interfaces/types.ts";
import { HELP_TEMPLATE } from "./templates.ts";
import {
  HELP_ARGUMENT_REGEX,
  ARGUMENT_REGEX,
  SPLIT_ARGUMENT_REGEX,
} from "../../constants/regex.ts";

interface TestOptions {
  entryPoint?: string;
  cwd?: string;
  runtimeOptions?: string[];
  help?: boolean;
}

const DENO_TEST_COMMAND = "test";

export class Test implements Command {
  constructor(
    private args: string[],
    private config: DrunConfig,
  ) {}

  private parseArguments(): TestOptions {
    const options: TestOptions = {};
    const showHelp = this.args.find(
      (arg) => HELP_ARGUMENT_REGEX.test(arg),
    );

    if (showHelp) {
      options.help = true;
      return options;
    }

    this.args.forEach((arg) => {
      if (!ARGUMENT_REGEX.test(arg)) {
        return;
      }

      const option = arg.match(SPLIT_ARGUMENT_REGEX);
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
    });

    return options;
  }

  public help(): void {
    console.log(HELP_TEMPLATE);
  }

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

    if (options.entryPoint) {
      options.entryPoint = await Deno.realPath(options.entryPoint);
    }

    if (options.excludes) {
      options.excludes = await resolvePathArray(options.excludes);
    }

    const runner = new Runner(DENO_TEST_COMMAND, options);
    await runner.run();
  }
}
