# Enrollwise Front-End CLI

Enrollwise CLI for React code generation.

## Installation

You can install CLI either globally or locally.

To install globally run `yarn global add enrollwise-fe-cli` or `npm i -g enrollwise-fe-cli`;

To install locally run `yarn add -D enrollwise-fe-cli` or `npm i --save-dev enrollwise-fe-cli` in the root of your project.

Create configuration file `ew-react-codegen.config.json` in the root of your project.

Populate it with the following content:

```json
{
  "componentsFolderPath": "./your_path_goes_here",
  "elementsFolderPath": "./your_path_goes_here",
  "hooksFolderPath": "./your_path_goes_here",
  "utilitiesFolderPath": "./your_path_goes_here"
}
```

If you've installed CLI locally, update your package.json `scripts` property:

```json
  "scripts": {
    "ew-react-codegen": "ew-react-codegen"
  }
```

If you've installed CLI locally you will need to call commans using your package manager of choise, for example:

`yarn ew-react-codegen component foo --props --tests` or `npm ew-react-codegen component foo --props --tests`

Congratulations! You're ready to use commands and generate code!

## Usage

CLI exposes following commands:

1. `ew-react-codegen component`
2. `ew-react-codegen element`
3. `ew-react-codegen hook`
4. `ew-react-codegen utility`

### Commands

#### `ew-react-codegen component`

Creates new component with optional props, tests, stories and styles

Accepts followind options:

- `--props` - Add props to the component
- `--story` - Add story to the component
- `--style` - Add style to the component
- `--tests` - Add tests to the component

#### `ew-react-codegen element`

Creates new element with optional props, tests, stories and styles

Accepts followind options:

- `--props` - Add props to the element
- `--story` - Add story to the element
- `--style` - Add style to the element
- `--tests` - Add tests to the element

#### `ew-react-codegen hook`

Creates new hook with optional props and tests

Accepts followind options:

- `--props` - Add props to the hook
- `--tests` - Add tests to the hook

#### `ew-react-codegen utility`

Creates new utility with optional parameters and tests

Accepts followind options:

- `--params` - Add params to the utility"
- `--tests` - Add tests to the utility"

#### `ew-react-codegen help`

Provides command line help and description for the CLI commands.
