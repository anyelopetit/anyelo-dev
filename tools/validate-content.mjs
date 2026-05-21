import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const indexPath = path.join(root, "public", "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("Missing public/index.html");
  process.exit(1);
}

const html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("name=\"viewport\"")) {
  console.error("Missing viewport meta");
  process.exit(1);
}

console.log("content validation ok");
