const fs = require('fs');
const path = require('path');

const i18nFilePath = path.join(__dirname, 'src/utils/i18n.ts');
let importStatements = [];

function findEnUSJsonFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.resolve(dir, file.name);

    if (file.isDirectory()) {
      findEnUSJsonFiles(fullPath);
    } else if (file.name === 'en-US.json') {
      const relativePath = path.relative(__dirname, fullPath);
      const importPath = relativePath
        .replace(/\\/g, '/')
        .replace('en-US.json', '${locale}.json');
      importStatements.push(
        `...(await import(\`../../${importPath}\`)).default`
      );
    }
  }
}

try {
  findEnUSJsonFiles(path.join(__dirname, '../../')); // Adjust this to the root of your project

  const messageLoaderFunction = `
export const messageLoader = async (locale: string) => {
  return {
    ${importStatements.join(',\n    ')}
  };
};
`;

  fs.writeFileSync(i18nFilePath, messageLoaderFunction);
  console.log(`messageLoader function updated in ${i18nFilePath}`);
} catch (err) {
  console.error('An error occurred:', err);
}
