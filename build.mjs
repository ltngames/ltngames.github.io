import { stat, mkdir, readdir, copyFile, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { watch } from 'chokidar';
import sirv from 'sirv-cli';
import MarkdownIt from 'markdown-it';

const sourceDir = 'src'
const destDir = 'public';

const md = new MarkdownIt();

async function parseMarkdown (file) {
  try {
    const content = await readFile(file, 'utf-8');
    const html = md.render(content);
    return html;
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return '';
  }
}

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
        if (extname(sourceFile) == '.md') {
          const html = await parseMarkdown(sourceFile);
          const dest = destFile.replace('.md', '.html');
          await writeFile(dest, html);
          return;
        }
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
  watcher.on('change', async (filePath) => {
    const relativePath = filePath.substring(sourceDir.length);
    const destPath = destDir + relativePath;

    if (extname(filePath) == '.md') {
      const html = await parseMarkdown(filePath);
      await writeFile(destPath, html);
      return;
    }

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