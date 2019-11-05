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
