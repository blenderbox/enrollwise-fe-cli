import { capitalize } from "../../utils";

export const storyImportsTemplate = (name: string) =>
  // eslint-disable-next-line quotes
  `import { ComponentMeta, ComponentStoryFn } from "@storybook/react";\nimport { ${capitalize(
    name
  )} } from "./${capitalize(name)}";\n`;

export const componentStoryMetaTemplate = (
  name: string
) => `const meta: ComponentMeta<typeof ${capitalize(name)}> = {
  argTypes: {},
  component: ${capitalize(name)},
  parameters: {
    docs: {
      description: {
        component: "${capitalize(name)} component"
      }
    }
  },
  title: "Components/${capitalize(name)}"
};

export default meta;\n`;

export const elementStoryMetaTemplate = (
  name: string
) => `const meta: ComponentMeta<typeof ${capitalize(name)}> = {
  argTypes: {},
  component: ${capitalize(name)},
  parameters: {
    docs: {
      description: {
        component: "${capitalize(name)} element"
      }
    }
  },
  title: "Elements/${capitalize(name)}"
};

export default meta;\n`;

export const itemStoryTemplate = (
  name: string,
  props = false
) => `const ${capitalize(name)}Template: ComponentStoryFn<
  typeof ${capitalize(name)}
> = (${props ? "args" : ""}) => {
  return (
      <${capitalize(name)} ${props ? "{...args}" : ""} />
  );
};

export const ${capitalize(name)}Story = ${capitalize(name)}Template.bind({});

${capitalize(name)}Story.args = {}\n`;

export const componentStoryTemplate = (name: string, props = false) =>
  `${storyImportsTemplate(name)}\n${componentStoryMetaTemplate(
    name
  )}\n${itemStoryTemplate(name, props)}\n`;

export const elementStoryTemplate = (name: string, props = false) =>
  `${storyImportsTemplate(name)}\n${elementStoryMetaTemplate(
    name
  )}\n${itemStoryTemplate(name, props)}\n`;
