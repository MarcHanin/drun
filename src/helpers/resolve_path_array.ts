/**
 * Resolve a list of paths
 *
 * @param paths - List of paths to resolve
 * @returns Resolved paths
 */
export const resolvePathArray = async (paths: string[]): Promise<string[]> => {
  const pathsToResolve = paths.map((path) => Deno.realPath(path));
  const resolvedPaths = await Promise.allSettled(pathsToResolve);

  const fulfilledPromises = resolvedPaths
    .filter((result) => result.status === "fulfilled") as any;

  return fulfilledPromises
    .map((res: PromiseFulfilledResult<string>) => res.value);
};
