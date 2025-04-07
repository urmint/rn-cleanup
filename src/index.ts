import fs from "fs";
import path from "path";
import chalk from "chalk";

const targetsToDelete = [
  "node_modules",
  "ios/Pods",
  "ios/Podfile.lock",
  "ios/DerivedData",
  "android/.gradle",
  "android/.idea",
  "android/build",
  "android/app/build",
  "dist",
  "build",
  "yarn-error.log",
  "npm-debug.log",
  "package-lock.json", // Only if you use Yarn
];

function deleteIfExists(targetPath: string) {
  if (fs.existsSync(targetPath)) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.log(`${chalk.green("✔ Deleted")} ${targetPath}`);
    } catch (err) {
      console.log(`${chalk.red("✖ Failed")} to delete ${targetPath}: ${err}`);
    }
  } else {
    console.log(`${chalk.yellow("• Skipped")} ${targetPath} (not found)`);
  }
}

export function cleanupProject() {
  console.log(
    chalk.cyan.bold("\n🧹 Cleaning up your React Native project...\n")
  );
  const projectRoot = process.cwd();

  targetsToDelete.forEach((relativePath) => {
    const absolutePath = path.join(projectRoot, relativePath);
    deleteIfExists(absolutePath);
  });

  console.log(chalk.cyan.bold("\n✅ Cleanup completed!\n"));
}

if (require.main === module) {
  cleanupProject();
}
