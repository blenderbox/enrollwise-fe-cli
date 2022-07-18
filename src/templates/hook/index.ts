import { capitalize } from "../../utils/common";

export const hookPropsTypeName = (hookName: string) =>
  `${capitalize(hookName)}Props`;

export const hookPropsTemplate = (hookName: string) =>
  `export type ${hookPropsTypeName(hookName)} = {};\n`;

export const hookTemplate = (hookName: string, props = false) =>
  `${
    props ? `${hookPropsTemplate(hookName)}\n` : ""
  }export function ${hookName}(${
    props ? `props: ${hookPropsTypeName(hookName)}` : ""
  }){};\n`;

export const hookIndexTemplate = (hookName: string) =>
  `export * from "./${hookName}";\n`;
