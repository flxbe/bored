export type AttributeConfig = {
  name: string;
  type: "string" | "int";
  optional: boolean;
};

export type ModelConfig = {
  name: string;
  attributes: Array<AttributeConfig>;
};

const config: ModelConfig = {
  name: "User",
  attributes: [
    {
      name: "email",
      type: "string",
      optional: false
    },
    {
      name: "username",
      type: "string",
      optional: false
    },
    {
      name: "password",
      type: "string",
      optional: false
    }
  ]
};

export default config;
