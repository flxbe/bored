import { ModelConfig, AttributeConfig } from "./config";

export function generateModel(config: ModelConfig): string {
  return `
    import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

    @Entity()
    export default class ${config.name} {

      @PrimaryGeneratedColumn()
      id!: number;

      ${generateClassAttributeList(config)}
    }
  `;
}

function generateClassAttributeList(config: ModelConfig) {
  const attributes = config.attributes.map(attribute => {
    const type = attribute.type;
    const optionalIdentifier = attribute.optional ? "?" : "!";
    return `
      @Column(${generateColumnOptions(attribute)})
      ${attribute.name}${optionalIdentifier}: ${type};
    `;
  });

  return attributes.join("\n");
}

function generateColumnOptions(config: AttributeConfig) {
  const options: Array<string> = [];

  if (config.optional) options.push("nullable: true");

  if (!options.length) return "";
  else return `{ ${options.join(",")} }`;
}
