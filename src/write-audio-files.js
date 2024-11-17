const fs = require('node:fs');
const path = require('node:path');

const { writeAudioFile } = require('./write-audio-file');

/**
 * Takes an array of MP3 audio buffers and writes them to files
 * @param {Array<Buffer>} buffers
 * @param {string} folder
 * @return {Promise<Array<string>>} The file names of the audio files
 */
const writeAudioFiles = async (buffers, folder) => {
  const files = [];
  if (buffers === undefined || buffers.length === 0) return [];

  if (!fs.existsSync(path.resolve(`./out/${folder}`))) {
    fs.mkdirSync(path.resolve(`./out/${folder}`));
  }

  for (let i = 0; i < buffers.length; i++) {
    files.push(await writeAudioFile(buffers[i], folder, i));
  }

  return files;
};

module.exports = { writeAudioFiles };
