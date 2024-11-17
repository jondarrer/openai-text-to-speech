const fs = require('node:fs');

/**
 * Reads in a file and returns an array of paragraphs, where a paragraph is seperated by a new line. Blank lines are ignored.
 * @param {string} filePath Fully qualified path to the file
 * @returns {Promise<Array<string>>} The file contents as an array of paragraphs
 */
const readTextFile = async (filePath) => {
  const result = [];
  const contents = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
  const paragraphs = contents.split('\n');

  for (let i = 0; i < paragraphs.length; i++) {
    if (!isEmptyOrSpaces(paragraphs[i])) {
      result.push(paragraphs[i]);
    }
  }

  return result;
};

const isEmptyOrSpaces = (str) => {
  return str === null || str.match(/^ *$/) !== null;
};

module.exports = { readTextFile };
