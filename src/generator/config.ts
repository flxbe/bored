export enum AttributeType {
  // basic types
  String = "string",

  // semantic types
  Email = "Email"
}

export type RawAttributeType = "string" | "int";

export interface AttributeConfig {
  name: string;
  type: RawAttributeType;
  optional: boolean;
  tags: Array<string>;
}

export interface ModelConfig {
  name: string;
  attributes: Array<AttributeConfig>;
}

export function getAttributeType(attribute: AttributeConfig): AttributeType {
  switch (attribute.type) {
    case "string":
      return getStringType(attribute);
    default:
      throw new Error(`unknown type ${attribute}`);
  }
}

function getStringType(attribute: AttributeConfig): AttributeType {
  if (attribute.tags.includes("Email")) return AttributeType.Email;
  else return AttributeType.String;
}

export function isSemanticType(type: AttributeType): boolean {
  return !isBasicType(type);
}

export function isBasicType(type: AttributeType): boolean {
  return [AttributeType.String].includes(type);
}
