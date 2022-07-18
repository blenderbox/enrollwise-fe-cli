import { capitalize } from "../../common";
import { appendFile, outputFile, pathExists, readFile } from "fs-extra";
import {
  utilityIndexTemplate,
  utilityTemplate,
  utilityTestTemplate,
} from "../../../templates";

export type BuildUtilityParams = {
  params?: boolean;
  tests?: boolean;
};

export const buildUtility = async (
  utilityName: string,
  path: string,
  params: BuildUtilityParams = {}
) => {
  const { params: utilParams, tests } = params;

  const utilityIndexPath = `${path}/${utilityName}/index.ts`;

  const utilityFilePath = `${path}/${utilityName}/${utilityName}.ts`;

  const outputs = [
    outputFile(utilityIndexPath, utilityIndexTemplate(utilityName), {
      encoding: "utf-8",
    }),
    outputFile(utilityFilePath, utilityTemplate(utilityName, utilParams), {
      encoding: "utf-8",
    }),
  ];

  if (tests) {
    const utilityTestsPath = `${path}/${capitalize(
      utilityName
    )}/__tests__/${utilityName}.test.ts`;

    outputs.push(
      outputFile(utilityTestsPath, utilityTestTemplate(utilityName), {
        encoding: "utf-8",
      })
    );
  }

  await Promise.all(outputs);

  const utilitysRootIndexPath = `${path}/index.ts`;

  if (await pathExists(utilitysRootIndexPath)) {
    const content = await readFile(utilitysRootIndexPath).then((buffer) =>
      buffer.toString("utf-8")
    );

    if (content.includes(utilityIndexTemplate(utilityName))) return;

    await appendFile(utilitysRootIndexPath, utilityIndexTemplate(utilityName), {
      encoding: "utf-8",
    });
  } else {
    outputFile(utilitysRootIndexPath, utilityIndexTemplate(utilityName), {
      encoding: "utf-8",
    });
  }
};
