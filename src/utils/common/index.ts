import { pathExists, readJSON } from "fs-extra";
import { resolve } from "path";

export type GeneratorConfig = {
  componentsFolderPath: Maybe<string>;
  elementsFolderPath: Maybe<string>;
  hooksFolderPath: Maybe<string>;
  utilitiesFolderPath: Maybe<string>;
};

export const resolveConfig = async (path = "./fe-generator.config.json") => {
  const configPath = resolve(process.cwd(), path);

  const config: GeneratorConfig = await pathExists(configPath).then(
    async (exists) => {
      if (!exists) {
        throw new Error(
          `Generator config was not found at path: "${configPath}".`
        );
      } else {
        return await readJSON(configPath);
      }
    }
  );

  return config;
};

export const capitalize = (str: string) => {
  const [first, ...rest] = str;

  return [first.toUpperCase(), ...rest].join("");
};
