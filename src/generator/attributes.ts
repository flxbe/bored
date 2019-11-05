import { getAttributeType, ModelConfig } from "./types";

export function generateClassAttributeList(config: ModelConfig) {
  const attributes = config.attributes.map(attribute => {
    const type = attribute.type;
    const optionalIdentifier = attribute.optional ? "?" : "!";
    return `public ${attribute.name}${optionalIdentifier}: ${type};`;
  });

  return attributes.join("\n");
}

export function generateTableAttributeList(config: ModelConfig) {
  const attributes = config.attributes.map(attribute => {
    return `${attribute.name}: {
      type: ${getColumnType(attribute.type)},
      allowNull: ${attribute.optional}
    },`;
  });

  return attributes.join("\n");
}

function getColumnType(typeName: string) {
  switch (typeName) {
    case "string":
      return "DataTypes.STRING";
    default:
      throw Error(`Unknown type name: ${typeName}`);
  }
}
