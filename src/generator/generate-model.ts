import { ModelConfig } from "./types";

import {
  generateClassAttributeList,
  generateTableAttributeList
} from "./attributes";

export function generateModel(config: ModelConfig): string {
  return `
    import { Sequelize, DataTypes, Model } from "sequelize";
    import Email from "../gen-utils/email";

    export default class ${config.name} extends Model {
      ${generateClassAttributeList(config)}

      public static connect(sequelize: Sequelize) {
      ${config.name}.init(
        {
          ${generateTableAttributeList(config)}
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
