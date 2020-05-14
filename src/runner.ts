import { Config } from "./interfaces/types.ts";

const DENO_EXE = "deno";
const DENO_RUN_COMMAND = "run";
const DEFAULT_CWD = "./";

export class Runner {
  constructor(
    private entryPath: string,
    private config: Config,
  ) {}

  /**
   * Get CWD
   */
  private getCwd(): Promise<string> {
    if (this.config.cwd) {
      return Deno.realPath(this.config.cwd);
    }

    return Deno.realPath(DEFAULT_CWD);
  }

  /**
   * Run program as child process
   */
  private runProcess(): Deno.Process {
    return Deno.run({
      cmd: [
        DENO_EXE,
        DENO_RUN_COMMAND,
        "--allow-all", // TODO Manage permissions
        this.entryPath,
      ],
    });
  }

  /**
   * Check if child process should be reload
   *
   * @param event - FS event
   */
  private shouldReload(event: Deno.FsEvent): boolean {
    if (event.kind !== "modify") {
      return false;
    }

    if (this.config && Array.isArray(this.config.excludes)) {
      for (let i = 0; i < event.paths.length; i++) {
        if (this.config.excludes.includes(event.paths[i])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Run program
   */
  public async run(): Promise<void> {
    const cwd = await this.getCwd();
    const events = Deno.watchFs(cwd);
    let process = this.runProcess();

    for await (const event of events) {
      if (this.shouldReload(event)) {
        process.kill(Deno.Signal.SIGINT);
        process = this.runProcess();
      }
    }
  }
}
