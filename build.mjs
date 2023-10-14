import { stat, mkdir, readdir, copyFile, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { watch } from 'chokidar';
import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import fmParser from 'frontmatter';
import { startServer } from './server.mjs';

const sourceDir = 'src'
const destDir = 'public';

const md = new MarkdownIt();
md.use(mdContainer, 'tip', {
  validate: function (params) {
    return params.trim() === 'tip';
  },
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      // Opening tag
      return '<div class="notification is-info">\n';
    } else {
      // Closing tag
      return '</div>\n';
    }
  }
});

async function parseMarkdown (file) {
  try {
    const content = await readFile(file, 'utf-8');
    const frontmatter = fmParser(content)
    const contentWithoutFrontmatter = content.replace(/^---\n([\s\S]+?)\n---\n/, '');
    const html = md.render(contentWithoutFrontmatter, '');
    if (frontmatter && frontmatter.data?.layout) {
      const contentRegex = /{{\s*content\s*}}/i
      const layout = await readFile(`${sourceDir}/layouts/${frontmatter.data.layout}.html`, 'utf-8');
      const htmlWithLayout = layout.replace(contentRegex, html);
      return htmlWithLayout;
    }
    return html;
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return '';
  }
}

async function copyDirectory (source, destination, markdownOnly = false) {
  try {
    const files = await readdir(source);
    for (const file of files) {
      const sourceFile = join(source, file);
      const destFile = join(destination, file);

      if (markdownOnly && !extname(file) == '.md') {
        continue;
      }

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
    startServer();
  }

  if (!watchArg && !serveArg) {
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

    if (filePath.includes('layouts')) {
      copyDirectory(sourceDir, destDir, true);
    }
  
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