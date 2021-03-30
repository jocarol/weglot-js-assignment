const fs = require('fs').promises
const assert = require('assert');
const { findRange } = require('../src/app')

describe('Find the earliest available 60mn slot: \n', () => {
    for (let i = 1; i <= 5; ++i) {
        it(`input ${i} should match output ${i}`, async () => {
            const input = await fs.readFile(`data/input${i}.txt`, 'utf8')
            const output = findRange(input)
            const expectedOutput = (await fs.readFile(`data/output${i}.txt`, 'utf8'))
            assert.strictEqual(output, expectedOutput)
        })
    }
})
