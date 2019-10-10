const fs = require("fs");
const prettier = require("prettier");

const UserConfig = require("./user.config");

function generate(config, filePath) {
  const content = generateContent(config);
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

function generateContent(config) {
  let content = `const Sequelize = require("sequelize");

class ${config.name} extends Sequelize.Model {}

module.exports = function ${config.name}Model(sequelize) {
  ${config.name}.init(
    {
      ${generateAttributeList(config)}
    },
    {
      sequelize,
      modelName: "${config.name.toLowerCase()}"
    }
  );

  return ${config.name};
};
  `;

  return prettier.format(content, { parser: "babel" });
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
      return "Sequelize.STRING";
    default:
      throw Error(`Unknown type name: ${typeName}`);
  }
}

generate(UserConfig, "./src/generated/user.js");
