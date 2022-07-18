import { capitalize } from "../../utils/common";

export const componentStylesTemplate = () =>
  // eslint-disable-next-line quotes
  `import styles from "./styles.module.scss";\n`;

export const componentPropsTypeName = (componentName: string) =>
  `${capitalize(componentName)}Props`;

export const componentPropsTemplate = (componentName: string) =>
  `export type ${componentPropsTypeName(componentName)} = {};\n`;

export const componentTemplate = (
  componentName: string,
  props = false,
  style = false
) =>
  `${style ? `${componentStylesTemplate()}\n` : ""}${
    props ? `${componentPropsTemplate(componentName)}\n` : ""
  }export const ${capitalize(componentName)} = (${
    props ? `props: ${componentPropsTypeName(componentName)}` : ""
  }) => {};\n`;

export const componentIndexTemplate = (componentName: string) =>
  `export * from "./${capitalize(componentName)}";\n`;
