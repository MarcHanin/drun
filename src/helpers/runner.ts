const DENO_EXE = "deno";
const DEFAULT_CWD = "./";
const UPDATE_FS_EVENT = "modify";

const MAX_TRIES = 10;
const SLEEP_MS = 10;

export class Runner {
  constructor(
    private runtimeCommand: string,
    private options: any,
  ) {}

  /**
   * Get the current working directory
   *
   * @returns The current working directory
   */
  public getCwd(): Promise<string> {
    if (this.options.cwd) {
      return Deno.realPath(this.options.cwd);
    }

    return Deno.realPath(DEFAULT_CWD);
  }

  /**
   * Run a process
   *
   * @returns Process informations
   */
  public runProcess(): Deno.Process {
    const runtimeOptions = this.options.runtimeOptions ?? [];

    return Deno.run({
      cmd: [
        DENO_EXE,
        this.runtimeCommand,
        ...runtimeOptions,
        this.options.entryPoint,
      ],
    });
  }

  /**
   * Detect whether to reload the process
   *
   * @param event FsEvent
   */
  private shouldReload(fsEvent: Deno.FsEvent): boolean {
    if (fsEvent.kind !== UPDATE_FS_EVENT) {
      return false;
    }

    if (this.options && Array.isArray(this.options.excludes)) {
      for (let i = 0; i < fsEvent.paths.length; i++) {
        if (this.options.excludes.includes(fsEvent.paths[i])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Resolves the promise after a given time
   * @param ms time in millis
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Run process
   */
  public async run(): Promise<void> {
    const cwd = await this.getCwd();
    const events = Deno.watchFs(cwd);
    let process = this.runProcess();

    for await (const event of events) {
      if (this.shouldReload(event)) {
        for (let i = 0; i < MAX_TRIES; i++) { // try to kill the process multiple times
          try {
            process.kill(Deno.Signal.SIGINT); // may throw Permission Denied by OS
            break;
          } catch (e) {
            await this.sleep(SLEEP_MS); // wait and pray for recover
          }
        }
        process = this.runProcess();
      }
    }
  }
}
