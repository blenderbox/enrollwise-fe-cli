import { capitalize } from "../../utils/common";

export const componentTestTemplate = (
  componentName: string
) => `import { ${capitalize(componentName)} } from "../${capitalize(
  componentName
)}";

describe("${capitalize(componentName)} Component", () => {});
`;

export const elementTestTemplate = (
  elementName: string
) => `import { ${capitalize(elementName)} } from "../${capitalize(
  elementName
)}";

describe("${capitalize(elementName)} Element", () => {});
`;

export const hookTestTemplate = (
  hookName: string
) => `import { ${hookName} } from "../${hookName}";

describe("${capitalize(hookName)} hook", () => {});
`;

export const utilityTestTemplate = (
  utilityName: string
) => `import { ${utilityName} } from "../${utilityName}";

describe("${capitalize(utilityName)} utility", () => {});
`;
