const { it } = require('node:test');
const assert = require('node:assert/strict');

it('ignores blank lines', async (t) => {
  // Arrange
  // @ts-ignore-next-line
  const mock = t.mock.module('node:fs', {
    namedExports: {
      promises: {
        readFile() {
          return 'p11. p12.\n  \np21. p22.';
        },
      },
    },
  });
  const { readTextFile } = require('./read-text-file');

  // Act
  const paragraphs = await readTextFile('mock is used instead');

  // Assert
  assert.ok(paragraphs);
  assert.equal(paragraphs.length, 2);
  assert.equal(paragraphs[0], 'p11. p12.');
  assert.equal(paragraphs[1], 'p21. p22.');

  mock.restore();
});
