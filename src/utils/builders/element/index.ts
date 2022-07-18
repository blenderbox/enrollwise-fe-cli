import { capitalize } from "../../common";
import { appendFile, outputFile, pathExists, readFile } from "fs-extra";
import {
  elementIndexTemplate,
  elementTemplate,
  elementTestTemplate,
} from "../../../templates";

export type BuildElementParams = {
  props?: boolean;
  story?: boolean;
  style?: boolean;
  tests?: boolean;
};

export const buildElement = async (
  elementName: string,
  path: string,
  params: BuildElementParams = {}
) => {
  const { props, style, tests } = params;

  const elementIndexPath = `${path}/${capitalize(elementName)}/index.ts`;

  const elementFilePath = `${path}/${capitalize(elementName)}/${capitalize(
    elementName
  )}.tsx`;

  const outputs = [
    outputFile(elementIndexPath, elementIndexTemplate(elementName), {
      encoding: "utf-8",
    }),
    outputFile(elementFilePath, elementTemplate(elementName, props, style), {
      encoding: "utf-8",
    }),
  ];

  if (tests) {
    const elementTestsPath = `${path}/${capitalize(
      elementName
    )}/__tests__/${capitalize(elementName)}.test.tsx`;

    outputs.push(
      outputFile(elementTestsPath, elementTestTemplate(elementName), {
        encoding: "utf-8",
      })
    );
  }

  if (style) {
    const elementStylesPath = `${path}/${capitalize(
      elementName
    )}/styles.module.scss`;

    outputs.push(
      outputFile(elementStylesPath, "", {
        encoding: "utf-8",
      })
    );
  }

  await Promise.all(outputs);

  const elementsRootIndexPath = `${path}/index.ts`;

  if (await pathExists(elementsRootIndexPath)) {
    const content = await readFile(elementsRootIndexPath).then((buffer) =>
      buffer.toString("utf-8")
    );

    if (content.includes(elementIndexTemplate(elementName))) return;

    await appendFile(elementsRootIndexPath, elementIndexTemplate(elementName), {
      encoding: "utf-8",
    });
  } else {
    outputFile(elementsRootIndexPath, elementIndexTemplate(elementName), {
      encoding: "utf-8",
    });
  }
};
