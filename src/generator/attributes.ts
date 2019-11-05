import {
  getAttributeType,
  ModelConfig,
  AttributeConfig,
  AttributeType
} from "./types";

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
      allowNull: ${attribute.optional},
      validate: ${getAttributeValidators(attribute)}
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

function getAttributeValidators(config: AttributeConfig) {
  const validators: Array<string> = [];

  const typeValidator = getTypeValidator(getAttributeType(config));
  if (typeValidator) validators.push(typeValidator);

  return `{ ${validators.join(", ")} }`;
}

function getTypeValidator(type: AttributeType): string | null {
  switch (type) {
    case AttributeType.Email:
      return "isEmail: true";
    default:
      return null;
  }
}
