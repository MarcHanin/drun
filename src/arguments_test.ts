import { assertEquals } from '../dev_deps.ts';
import { parseArguments } from './arguments.ts';

Deno.test('parse with empty arguments', () => {
  const args = [] as string[];
  const expected = {};

  assertEquals(parseArguments(args), expected);
});

Deno.test('parse with unknown argument', () => {
  const args = ['--unknownArg=true'];
  const expected = {};

  assertEquals(parseArguments(args), expected);
});

Deno.test('parse with entryPoint argument', () => {
  const args = ['--entryPoint=main.ts'];
  const expected = { entryPoint: 'main.ts' };

  assertEquals(parseArguments(args), expected);
});

Deno.test('parse with cwd argument', () => {
  const args = ['--cwd=cwdFolder'];
  const expected = { cwd: 'cwdFolder' };

  assertEquals(parseArguments(args), expected);
});

Deno.test('parse with all arguments', () => {
  const args = [
    '--entryPoint=main.ts',
    '--cwd=cwdFolder',
    '--unknownArg=true'
  ];
  const expected = {
    entryPoint: 'main.ts',
    cwd: 'cwdFolder',
  };

  assertEquals(parseArguments(args), expected);
});
