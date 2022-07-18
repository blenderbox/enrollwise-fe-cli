import { capitalize } from "../../common";
import { appendFile, outputFile, pathExists, readFile } from "fs-extra";
import {
  hookIndexTemplate,
  hookTemplate,
  hookTestTemplate,
} from "../../../templates";

export type BuildHookParams = {
  params?: boolean;
  tests?: boolean;
};

export const buildHook = async (
  hookName: string,
  path: string,
  params: BuildHookParams = {}
) => {
  const { params: hookParams, tests } = params;

  const hookIndexPath = `${path}/${hookName}/index.ts`;

  const hookFilePath = `${path}/${hookName}/${hookName}.ts`;

  const outputs = [
    outputFile(hookIndexPath, hookIndexTemplate(hookName), {
      encoding: "utf-8",
    }),
    outputFile(hookFilePath, hookTemplate(hookName, hookParams), {
      encoding: "utf-8",
    }),
  ];

  if (tests) {
    const hookTestsPath = `${path}/${capitalize(
      hookName
    )}/__tests__/${hookName}.test.ts`;

    outputs.push(
      outputFile(hookTestsPath, hookTestTemplate(hookName), {
        encoding: "utf-8",
      })
    );
  }

  await Promise.all(outputs);

  const hooksRootIndexPath = `${path}/index.ts`;

  if (await pathExists(hooksRootIndexPath)) {
    const content = await readFile(hooksRootIndexPath).then((buffer) =>
      buffer.toString("utf-8")
    );

    if (content.includes(hookIndexTemplate(hookName))) return;

    await appendFile(hooksRootIndexPath, hookIndexTemplate(hookName), {
      encoding: "utf-8",
    });
  } else {
    outputFile(hooksRootIndexPath, hookIndexTemplate(hookName), {
      encoding: "utf-8",
    });
  }
};
