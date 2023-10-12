import { stat, mkdir, readdir, copyFile } from 'fs/promises';
import { join } from 'path';
import { watch } from 'chokidar';
import sirv from 'sirv-cli';

const sourceDir = 'src'
const destDir = 'public';

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

async function copyDirectory (source, destination) {
  try {
    const files = await readdir(source);
    for (const file of files) {
      const sourceFile = join(source, file);
      const destFile = join(destination, file);

      const stats = await stat(sourceFile);

      if (stats.isDirectory()) {
        await mkdir(destFile, { recursive: true });
        await copyDirectory(sourceFile, destFile);
      } else {
        await copyFile(sourceFile, destFile);
      }
    }
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}

async function main () {
  console.log(`Copying files from ${sourceDir} to ${destDir}...`);
  await copyDirectory(sourceDir, destDir);
  const watchArg = process.argv.includes('--watch');
  const serveArg = process.argv.includes('--serve');

  if (serveArg) {
    const assets = sirv('public', {
      maxAge: 31536000,
      immutable: true
    });
  }

  if (!watchArg) {
    process.exit();
  }

  const watcher = watch(sourceDir, {
    ignored: /(^|[/\\])\../, // Ignore dotfiles
    persistent: true,
  });

  console.log(`Watching for changes in ${sourceDir}...`);
  watcher.on('change', (filePath) => {
    const relativePath = filePath.substring(sourceDir.length);
    const destPath = destDir + relativePath;

    copyFile(filePath, destPath)
      .then(f => {
        console.log(`Copied: ${filePath} => ${destPath}`);
        console.log('.....')
      })
      .catch(err => {
        if (err) {
          console.error('Error copying file:', err);
        }
      })
  });

  watcher.on('error', (error) => {
    console.error('Watcher error:', error);
  });
}

main().catch((err) => {
  console.error('An error occurred:', err);
});