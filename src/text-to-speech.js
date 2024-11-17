const assert = require('node:assert').strict;

/**
 * Wrapper around OpenAI text-to-speech API, see https://platform.openai.com/docs/guides/text-to-speech
 * @param {import("openai").OpenAI} openai
 * @param {"alloy"|"echo"|"fable"|"onyx"|"nova"|"shimmer"} voice The voice to use as per https://platform.openai.com/docs/guides/text-to-speech?lang=node#voice-options
 * @param {string} input String less than 4096 chars long
 * @param {boolean} dummy If true, then the service is not called, and instead an empty buffer is returned
 * @returns {Promise<Buffer>}
 */
const textToSpeech = async (openai, voice, input, dummy) => {
  assert.ok(input);
  assert.ok(input.length < 4096, `Input longer than 4096: ${input.length} chars long`);
  if (dummy) console.log('textToSpeech', { dummy });

  if (dummy) return Buffer.alloc(0);

  const audio = await openai.audio.speech.create({
    model: 'tts-1',
    voice,
    input,
  });
  return Buffer.from(await audio.arrayBuffer());
};

module.exports = { textToSpeech };
