# Drun (Deno runner)

Helps to restart automatically your deno application during development

## How to use

```sh
drun --entryPoint=./index.ts --cwd=./
```

- `--entryPoint`: The entry point of your program
- `--cwd`: Root folder from which you want to watch

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
  ]
}
```
