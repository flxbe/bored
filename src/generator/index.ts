import * as fs from "fs";
import * as prettier from "prettier";

import { generateModel } from "./generate-model";
import UserConfig from "../configs/user.config";
import { generateModelTests } from "./generate-model-test";

function saveCode(code: string, filePath: string) {
  const formattedCode = prettier.format(code, { parser: "typescript" });
  fs.writeFileSync(filePath, formattedCode, { encoding: "utf8" });
}

saveCode(generateModel(UserConfig), "./src/generated/user.ts");
saveCode(generateModelTests(UserConfig), "./src/generated/user.test.ts");
