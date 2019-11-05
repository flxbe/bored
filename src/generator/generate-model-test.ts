import { ModelConfig, AttributeConfig } from "./types";

export function generateModelTests(config: ModelConfig): string {
  return `
    import * as faker from "faker";
    import ${config.name} from "./${config.name.toLowerCase()}";  

    ${generateFactoryDataInterface(config)}
    ${generateFactory(config)}
  `;
}

function generateFactoryDataInterface(config: ModelConfig): string {
  const attributes = config.attributes
    .map(generateFactoryDataAttribute)
    .join("\n");

  return `
    interface ${getFactoryDataInterfaceName(config)} {
      ${attributes}
    }
  `;
}

function generateFactoryDataAttribute(attribute: AttributeConfig): string {
  const type = attribute.optional ? `${attribute.type} | null` : attribute.type;
  return `${attribute.name}?: ${type};`;
}

function generateFactory(config: ModelConfig): string {
  const defaultAttributes = config.attributes
    .map(generateDefaultAttributeFaker)
    .join("");

  return `
    export async function create${
      config.name
    } (data: ${getFactoryDataInterfaceName(config)} = {}): Promise<${
    config.name
  }> {
      ${defaultAttributes}

      return ${config.name}.create(data);
    }
  `;
}

function getFactoryDataInterfaceName(config: ModelConfig): string {
  return `Create${config.name}Data`;
}

function generateDefaultAttributeFaker(config: AttributeConfig): string {
  const faker = getFaker(config);

  return `if (data.${config.name} === undefined) data.${config.name} = ${faker}();`;
}

function getFaker(config: AttributeConfig): string {
  switch (config.type) {
    case "string":
      return "faker.lorem.word";
    default:
      throw new Error(`Unknown data type ${config.type}`);
  }
}
