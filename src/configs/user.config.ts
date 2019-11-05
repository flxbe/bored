import { ModelConfig } from "../generator/types";

const config: ModelConfig = {
  name: "User",
  attributes: [
    {
      name: "email",
      type: "string",
      optional: false,
      tags: ["Email"]
    },
    {
      name: "password",
      type: "string",
      optional: false,
      tags: []
    },
    {
      name: "username",
      type: "string",
      optional: false,
      tags: []
    },
    {
      name: "phoneNumber",
      type: "string",
      optional: true,
      tags: ["PhoneNumber"]
    }
  ]
};

export default config;
