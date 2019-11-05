import { ModelConfig, AttributeConfig } from "./types";

export function generateModel(config: ModelConfig): string {
  return `
    import { Sequelize, DataTypes, Model } from "sequelize";

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
