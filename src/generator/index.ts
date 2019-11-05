import * as fs from "fs";

import { generateModel, ModelConfig } from "./generate-model";
import UserConfig from "../configs/user.config";

function generate(config: ModelConfig, filePath: string) {
  const content = generateModel(config);
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

generate(UserConfig, "./src/generated/user.ts");
