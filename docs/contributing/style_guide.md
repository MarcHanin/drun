# Drun style guide

## Use underscore in filenames

Underscore should be used for filenames.

Example:
`my_file.ts`

## TODO Comments

TODO comments should usually include an issue.

Example:
```
// TODO: (#12) Add new functionnality
```

## Use TypeScript instead of JavaScript

TypeScript should be used instead of JavaScript


## Unit tests

Unit tests should be written as follows:

```
Deno.test("[<scope>] <description>", () => {
    // Test content
})
```

## Document your code

Please document your code with JSDoc

## Top level functions should not use arrow syntax

Top level functions should use the `function` keyword. Arrow syntax should be limited to closures.

## Naming

### Classes

- Should be pascal case
- Should not end with `impl` or any other word wich describes a specific implementation of an interface

### Interfaces

- Follow the same rules as Classes
- Should not have `I` or `Interface` in the name or any other way of identifying it as an interface

### Methods and functions

- Should be camel case
