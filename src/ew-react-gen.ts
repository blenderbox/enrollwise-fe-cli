import { program } from "commander";
import { resolve } from "path";
import {
  buildComponent,
  BuildComponentParams,
  buildElement,
  BuildElementParams,
  buildHook,
  BuildHookParams,
  buildUtility,
  BuildUtilityParams,
  resolveConfig,
} from "./utils";

resolveConfig().then(async (config) => {
  program
    .name("ew-react-gen")
    .description("CLI to create React components and utilities")
    .version("1.0.0");

  program
    .command("component")
    .description(
      "Creates new component with optional props, tests, stories and styles"
    )
    .argument("<name>", "Component name")
    .option("--props", "Add props to the component")
    .option("--story", "Add story to the component")
    .option("--style", "Add style to the component")
    .option("--tests", "Add tests to the component")
    .action(async (name: string, opts: BuildComponentParams) => {
      if (!new RegExp(/^(?!\d){1,}(\w)*/g).test(name)) {
        throw new Error(
          `Component name "${name}" is incorrect. Component name should start with a letter.`
        );
      }

      await buildComponent(
        name,
        resolve(process.cwd(), config.componentsFolderPath || "./components"),
        opts
      );
    });

  program
    .command("element")
    .description(
      "Creates new element with optional props, tests, stories and styles"
    )
    .argument("<name>", "Element name")
    .option("--props", "Add props to the element")
    .option("--story", "Add story to the element")
    .option("--style", "Add style to the element")
    .option("--tests", "Add tests to the element")
    .action(async (name: string, opts: BuildElementParams) => {
      if (!new RegExp(/^(?!\d){1,}(\w)*/g).test(name)) {
        throw new Error(
          `Element name "${name}" is incorrect. Element name should start with a letter.`
        );
      }

      await buildElement(
        name,
        resolve(process.cwd(), config.elementsFolderPath || "./elements"),
        opts
      );
    });

  program
    .command("hook")
    .description("Creates new hook with optional props and tests")
    .argument("<name>", "Hook name")
    .option("--props", "Add props to the hook")
    .option("--tests", "Add tests to the hook")
    .action(async (name: string, opts: BuildHookParams) => {
      if (!new RegExp(/^(use)([\w\d])+/g).test(name)) {
        throw new Error(
          `Hook name "${name}" is incorrect. Hook name should start with "use" and consist of letters or digits only.`
        );
      }

      await buildHook(
        name,
        resolve(process.cwd(), config.hooksFolderPath || "./hooks"),
        opts
      );
    });

  program
    .command("utility")
    .description("Creates new utility with optional props and tests")
    .argument("<name>", "Utility name")
    .option("--params", "Add params to the utility")
    .option("--tests", "Add tests to the utility")
    .action(async (name: string, opts: BuildUtilityParams) => {
      if (!new RegExp(/^(?!\d){1,}(\w)*/g).test(name)) {
        throw new Error(
          `Utility name "${name}" is incorrect. Utility name should start with a letter.`
        );
      }

      await buildUtility(
        name,
        resolve(process.cwd(), config.utilitiesFolderPath || "./utilities"),
        opts
      );
    });

  program.parse();
});
