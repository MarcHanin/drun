/**
 * Parse arguments
 * @param args - list of args
 */
export function parseArguments(args: string[]) {
  const parsedArguments: any = {};

  args.forEach((arg) => {
    if (arg.includes("--entryPoint=")) {
      parsedArguments.entryPoint = arg.split("=")[1];
    }

    if (arg.includes("--cwd=")) {
      parsedArguments.cwd = arg.split("=")[1];
    }
  });

  return parsedArguments;
}
