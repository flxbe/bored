const fs = require("fs");
const prettier = require("prettier");

const UserConfig = require("./configs/user.config");

function generate(config, filePath) {
  const content = generateContent(config);
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

function generateContent(config) {
  let content = `import { Sequelize, DataTypes, Model } from "sequelize";

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

  return prettier.format(content, { parser: "typescript" });
}

function generateClassAttributeList(config) {
  const attributes = config.attributes.map(attribute => {
    const optionalIdentifier = "!";
    const type = getClassType(attribute);
    return `public ${attribute.name}${optionalIdentifier}: ${type};`;
  });

  return attributes.join("\n");
}

function getClassType(attribute) {
  return attribute.type;
}

function generateAttributeList(config) {
  const attributes = config.attributes.map(attribute => {
    return `${attribute.name}: {
      type: ${getType(attribute.type)},
      allowNull: ${attribute.optional}
    },`;
  });

  return attributes.join("\n");
}

function getType(typeName) {
  switch (typeName) {
    case "string":
      return "DataTypes.STRING";
    default:
      throw Error(`Unknown type name: ${typeName}`);
  }
}

generate(UserConfig, "./src/generated/user.ts");
