import { ModelConfig } from "../generator/config";

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
      name: "hash",
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
