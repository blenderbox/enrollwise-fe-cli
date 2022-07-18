import { capitalize } from "../../common";
import { appendFile, outputFile, pathExists, readFile } from "fs-extra";
import {
  componentIndexTemplate,
  componentStoryTemplate,
  componentTemplate,
  componentTestTemplate,
} from "../../../templates";

export type BuildComponentParams = {
  props?: boolean;
  story?: boolean;
  style?: boolean;
  tests?: boolean;
};

export const buildComponent = async (
  componentName: string,
  path: string,
  params: BuildComponentParams = {}
) => {
  const { props, story, style, tests } = params;

  const componentIndexPath = `${path}/${capitalize(componentName)}/index.ts`;

  const componentFilePath = `${path}/${capitalize(componentName)}/${capitalize(
    componentName
  )}.tsx`;

  const outputs = [
    outputFile(componentIndexPath, componentIndexTemplate(componentName), {
      encoding: "utf-8",
    }),
    outputFile(
      componentFilePath,
      componentTemplate(componentName, props, style),
      {
        encoding: "utf-8",
      }
    ),
  ];

  if (tests) {
    const componentTestsPath = `${path}/${capitalize(
      componentName
    )}/__tests__/${capitalize(componentName)}.test.tsx`;

    outputs.push(
      outputFile(componentTestsPath, componentTestTemplate(componentName), {
        encoding: "utf-8",
      })
    );
  }

  if (story) {
    const componentStoryPath = `${path}/${capitalize(
      componentName
    )}/${capitalize(componentName)}.stories.tsx`;

    outputs.push(
      outputFile(
        componentStoryPath,
        componentStoryTemplate(componentName, props),
        {
          encoding: "utf-8",
        }
      )
    );
  }

  if (style) {
    const componentStylesPath = `${path}/${capitalize(
      componentName
    )}/styles.module.scss`;

    outputs.push(
      outputFile(componentStylesPath, "", {
        encoding: "utf-8",
      })
    );
  }

  await Promise.all(outputs);

  const componentsRootIndexPath = `${path}/index.ts`;

  if (await pathExists(componentsRootIndexPath)) {
    const content = await readFile(componentsRootIndexPath).then((buffer) =>
      buffer.toString("utf-8")
    );

    if (content.includes(componentIndexTemplate(componentName))) return;

    await appendFile(
      componentsRootIndexPath,
      componentIndexTemplate(componentName),
      {
        encoding: "utf-8",
      }
    );
  } else {
    outputFile(componentsRootIndexPath, componentIndexTemplate(componentName), {
      encoding: "utf-8",
    });
  }
};
