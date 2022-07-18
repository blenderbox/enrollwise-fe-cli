import { capitalize } from "../../utils/common";

export const elementStylesTemplate = () =>
  // eslint-disable-next-line quotes
  `import styles from "./styles.module.scss";\n`;

export const elementPropsTypeName = (elementName: string) =>
  `${capitalize(elementName)}Props`;

export const elementPropsTemplate = (elementName: string) =>
  `export type ${elementPropsTypeName(elementName)} = {};\n`;

export const elementTemplate = (
  elementName: string,
  props = false,
  style = false
) =>
  `${style ? `${elementStylesTemplate()}\n` : ""}${
    props ? `${elementPropsTemplate(elementName)}\n` : ""
  }export const ${capitalize(elementName)} = (${
    props ? `props: ${elementPropsTypeName(elementName)}` : ""
  }) => {};\n`;

export const elementIndexTemplate = (elementName: string) =>
  `export * from "./${capitalize(elementName)}";\n`;
