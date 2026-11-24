import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const openApiPath = path.resolve(currentDirectory, "../docs/openapi.yaml");

const openApiFile = fs.readFileSync(openApiPath, "utf8");
export const swaggerDocument = YAML.parse(openApiFile);
