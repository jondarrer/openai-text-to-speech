const assert = require('node:assert/strict');
const path = require('node:path');

const { readTextFile } = require('./read-text-file');
const { textToSpeech } = require('./text-to-speech');
const { writeAudioFile } = require('./write-audio-file');

/**
 * Takes in a text file, gets the audio from OpenAI and returns an array of buffers
 * @param {import("openai").OpenAI} openai
 * @param {"alloy"|"echo"|"fable"|"onyx"|"nova"|"shimmer"} voice The voice to use as per https://platform.openai.com/docs/guides/text-to-speech?lang=node#voice-options
 * @param {string} inputFileName
 * @param {boolean} dummy Whether or not to do a dummy run
 * @returns {Promise<Array<string>>} An array of MP3 audio file paths
 */
const processRequest = async (openai, voice, inputFileName, dummy = false) => {
  assert.ok(voice, 'Missing voice');
  assert.ok(inputFileName, 'Missing inputFileName');
  if (dummy) console.log('processRequest', { dummy });

  const outputFilePaths = [];
  const filePath = path.resolve(`./in/${inputFileName}`);
  const paragraphs = await readTextFile(filePath);
  // console.log('processRequest', {paragraphs})

  for (let i = 0; i < paragraphs.length; i++) {
    const buffer = await textToSpeech(openai, voice, paragraphs[i], dummy);
    const outputFilePath = await writeAudioFile(buffer, inputFileName, i);
    outputFilePaths.push(outputFilePath);
    console.log(`${outputFilePath}`);
  }

  return outputFilePaths;
};

module.exports = { processRequest };
