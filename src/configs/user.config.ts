import { ModelConfig } from "../generator/generate-model";

const config: ModelConfig = {
  name: "User",
  attributes: [
    {
      name: "email",
      type: "string",
      optional: false
    },
    {
      name: "password",
      type: "string",
      optional: false
    },
    {
      name: "username",
      type: "string",
      optional: false
    },
    {
      name: "phoneNumber",
      type: "string",
      optional: true
    }
  ]
};

export default config;
