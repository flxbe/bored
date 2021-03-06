import {
  getAttributeType,
  AttributeType,
  ModelConfig,
  AttributeConfig
} from "./config";

export function generateModelTests(config: ModelConfig): string {
  return `
    import { Connection, getConnection } from "typeorm";
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
  const rawType = attribute.type;
  const type = attribute.optional ? `${rawType} | null` : rawType;
  return `${attribute.name}?: ${type};`;
}

function generateFactory(config: ModelConfig): string {
  const defaultAttributes = config.attributes
    .map(generateDefaultAttributeFaker)
    .join("");
  const variable = config.name.toLowerCase();

  return `
    export async function create${config.name} (
      data: object & ${getFactoryDataInterfaceName(config)} = {}
    ): Promise<${config.name}> {
      ${defaultAttributes}

      const repository = getConnection().getRepository(${config.name});
      const ${variable} = repository.create(data);
      return repository.save(${variable});
    }
  `;
}

function getFactoryDataInterfaceName(config: ModelConfig): string {
  return `Create${config.name}Data`;
}

function generateDefaultAttributeFaker(config: AttributeConfig): string {
  const faker = getFaker(config);

  return `if (data.${config.name} === undefined) data.${config.name} = ${faker};`;
}

function getFaker(config: AttributeConfig): string {
  const type = getAttributeType(config);
  switch (type) {
    case AttributeType.Email:
      return "faker.internet.email()";
    case AttributeType.String:
      return "faker.lorem.word()";
    default:
      throw new Error(`Unknown data type ${type}`);
  }
}
