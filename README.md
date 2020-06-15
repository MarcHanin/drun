# Drun (Deno runner)

Helps to restart automatically your deno application during development

## Installation

```sh
deno install --allow-read --allow-run --unstable https://deno.land/x/drun/drun.ts
```

## How to use

### Watch

Use deno run with watch mode, remember to separate `--runtimeOptions` with commas and without spaces

```sh
drun watch --entryPoint=./index.ts --cwd=./ --runtimeOptions=--allow-net=0.0.0.0,--allow-write,--allow-read
```

#### Available options

- `--entryPoint`: The entry point of your program
- `--cwd`: Root folder from which you want to watch
- `--runtimeOptions`: Options you want to send to the Deno runtime
- `--help`: Display help for watch command

### Test

Use deno test with watch mode.

```sh
drun test --entryPoint=index.test.ts --runtimeOptions=--allow-read
```

#### Available options

- `--entryPoint`: The entry point of your test
- `--cwd`: Root folder from which you want to watch
- `--runtimeOptions`: Options you want to send to the Deno runtime
- `--help`: Display help for test command

### Help

Display help

```sh
drun help
```

## Configuration file

It is possible to create a configuration file at the cwd location.
This configuration file must be named `drun.json`

### Example of configuration file

```json
{
  "entryPoint": "./index.ts",
  "cwd": "./",
  "excludes": [
    "./file/you/want/to/exclude.ts"
  ],
  "runtimeOptions": [
    "--allow-net",
    "--allow-read"
  ]
}
```
