const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Takes an MP3 audio buffer and writes it to a file
 * @param {Buffer|undefined} buffer
 * @param {string} folder
 * @param {number} i
 * @return {Promise<string>} The file path to the audio file
 */
const writeAudioFile = async (buffer, folder, i) => {
  assert.ok(folder);
  assert.ok(!isNaN(i));

  if (buffer === undefined) return null;

  if (!fs.existsSync(path.resolve(`./out/${folder}`))) {
    fs.mkdirSync(path.resolve(`./out/${folder}`));
  }

  const outputFileName = `${('00' + i).slice(-3)}.mp3`;
  const outputFilePath = path.resolve(`./out/${folder}/${outputFileName}`);
  await fs.promises.writeFile(outputFilePath, buffer);

  return outputFilePath;
};

module.exports = { writeAudioFile };
