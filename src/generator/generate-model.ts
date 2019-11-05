import * as prettier from "prettier";

export type AttributeType = "string" | "int";

export interface AttributeConfig {
  name: string;
  type: AttributeType;
  optional: boolean;
}

export interface ModelConfig {
  name: string;
  attributes: Array<AttributeConfig>;
}

export function generateModel(config: ModelConfig): string {
  let content = `import { Sequelize, DataTypes, Model } from "sequelize";

export default class ${config.name} extends Model {
  ${generateClassAttributeList(config)}

  public static connect(sequelize: Sequelize) {

  ${config.name}.init(
    {
      ${generateAttributeList(config)}
    },
    {
      sequelize,
      modelName: "${config.name.toLowerCase()}"
    }
  );
  }
}
  `;

  return prettier.format(content, { parser: "typescript" });
}

function generateClassAttributeList(config: ModelConfig) {
  const attributes = config.attributes.map(attribute => {
    const optionalIdentifier = "!";
    const type = getClassType(attribute);
    return `public ${attribute.name}${optionalIdentifier}: ${type};`;
  });

  return attributes.join("\n");
}

function getClassType(attribute: AttributeConfig): string {
  return attribute.type;
}

function generateAttributeList(config: ModelConfig) {
  const attributes = config.attributes.map(attribute => {
    return `${attribute.name}: {
      type: ${getType(attribute.type)},
      allowNull: ${attribute.optional}
    },`;
  });

  return attributes.join("\n");
}

function getType(typeName: string) {
  switch (typeName) {
    case "string":
      return "DataTypes.STRING";
    default:
      throw Error(`Unknown type name: ${typeName}`);
  }
}
