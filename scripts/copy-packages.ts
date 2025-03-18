import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Copying package.json files to dist');

const packagePatchs = path.resolve(__dirname, '..', 'packages');
const dist = path.resolve(__dirname, '..', 'dist', 'packages');

const packages = fs.readdirSync(packagePatchs, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

packages.forEach((dirent) => {
  const packagePath = path.resolve(packagePatchs, dirent.name, 'package.json');
  if (fs.existsSync(packagePath)) {
    const distPackagePath = path.resolve(dist, dirent.name, 'package.json');

    if (!fs.existsSync(distPackagePath)) {
      fs.copyFileSync(packagePath, distPackagePath);
      console.log(`Copied ${dirent.name} package.json`);
    }
  }
});
