import fs from "node:fs";
import path from "node:path";

const manifestPath = path.resolve(
  process.cwd(),
  "qa",
  "route-runtime-manifest.json",
);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const shellLabels = {
  full_layout: "Full ToolLayout",
  lite_header: "Lite Shared Header",
  custom_app: "Custom App Shell",
};

console.log("No Gatekeeping Route Runtime QA");
console.log("");
console.log("How to use:");
console.log("- Run `npm run dev`.");
console.log("- Visit each route below in order.");
console.log("- Capture UX issues, console errors, and simplify-vs-reskin decisions.");
console.log("");

for (const item of manifest) {
  console.log(`${item.title} (${item.route})`);
  console.log(`  shell: ${shellLabels[item.shell] ?? item.shell}`);
  console.log(`  priority: ${item.priority}`);
  console.log(`  simplification: ${item.simplification}`);
  console.log("  checks:");
  for (const focus of item.review_focus) {
    console.log(`  - ${focus}`);
  }
  console.log("");
}
