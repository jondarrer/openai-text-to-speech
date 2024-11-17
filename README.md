# openai-text-to-speech

Produces speech from text using OpenAI. An OpenAI account is required, with credit.

The text should be split up into paragraphs of no more than 4096 characters long, a restriction applied by [OpenAI's text to speech feature](https://platform.openai.com/docs/guides/text-to-speech).

It can only produce speech based on text in [languages that OpenAI supports](https://platform.openai.com/docs/guides/text-to-speech?lang=node#supported-languages).

## Requirements

Node 20.18.0 or Node 22.3.0 for testing with module mocks, see [https://nodejs.org/api/test.html#mockmodulespecifier-options](https://nodejs.org/api/test.html#mockmodulespecifier-options).

## Setup

1. Create a `.env` file with the following environment variable:
   1. `OPENAI_API_KEY` An API key for your OpenAI account
2. Create a `./in` folder
3. Create a `./out` folder

## Run

1. Add the input text file to `./in` folder
2. Run the command `npm start -- --file=test.txt --voice=onyx` - if you want to do a dry run, add `--dummy` and OpenAI will not be called
3. Find the output files in `./out/{file}` folder
