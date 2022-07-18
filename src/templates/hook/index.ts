import { capitalize } from "../../utils/common";

export const hookParamsTypeName = (hookName: string) =>
  `${capitalize(hookName)}Params`;

export const hookPropsTemplate = (hookName: string) =>
  `export type ${hookParamsTypeName(hookName)} = {};\n`;

export const hookTemplate = (hookName: string, params = false) =>
  `${
    params ? `${hookPropsTemplate(hookName)}\n` : ""
  }export function ${hookName}(${
    params ? `params: ${hookParamsTypeName(hookName)}` : ""
  }){};\n`;

export const hookIndexTemplate = (hookName: string) =>
  `export * from "./${hookName}";\n`;
