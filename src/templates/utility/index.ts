import { capitalize } from "../../utils/common";

export const utilityParamsTypeName = (utilityName: string) =>
  `${capitalize(utilityName)}Params`;

export const utilityParamsTemplate = (utilityName: string) =>
  `export type ${utilityParamsTypeName(utilityName)} = {};\n`;

export const utilityTemplate = (utilityName: string, params = false) =>
  `${
    params ? `${utilityParamsTemplate(utilityName)}\n` : ""
  }export function ${utilityName}(${
    params ? `params: ${utilityParamsTypeName(utilityName)}` : ""
  }){};\n`;

export const utilityIndexTemplate = (utilityName: string) =>
  `export * from "./${utilityName}";\n`;
