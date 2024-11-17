const assert = require('node:assert/strict');

const OpenAI = require('openai');
const dotenv = require('dotenv');
const { Command } = require('commander');

const { processRequest } = require('./process-request');

const main = async () => {
  dotenv.config();

  assert.ok('OPENAI_API_KEY' in process.env, 'Missing OPENAI_API_KEY from environment variables');

  const program = new Command();

  program
    .name('openai-text-to-speech')
    .description('CLI to create MP3 audio files from text files using OpenAI')
    .version('1.0.0', '-v, --version', 'output the current version');

  program
    .requiredOption('-f --file <filename>', 'input filename found in the ./in folder')
    .option('-c, --voice <voice>', 'alloy, echo, fable, onyx, nova or shimmer - defaults to onyx', 'onyx')
    .option('-d, --dummy', 'whether or not to do a dummy run and not call out to OpenAI - defaults to false');

  program.parse();
  const opts = program.opts();
  console.log({ opts });
  const { file: inputFileName, voice, dummy } = opts;

  console.log(`Begin with ./in/${inputFileName}`);

  const apiKey = process.env.OPENAI_API_KEY;
  // @ts-ignore-next-line
  const openai = new OpenAI({ apiKey });

  const buffers = await processRequest(openai, voice, inputFileName, dummy);

  console.log(`Processed ${buffers.length} paragraphs`);
};

(async () => {
  await main();
})();
