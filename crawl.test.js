const { standardizeURL} = require('./crawl');
const { test, expect } = require('@jest/globals');

test('standardizeURL Strip Strailing Slashes', function() {
    const input = 'https://www.instagram.com/devdescom';
    const actual = standardizeURL(input);
    const expected = 'www.instagram.com/devdescom';

    // I expect that Actual result is equal to Expected result
    expect(actual).toEqual(expected);
});

test('standardizeURL Capitals', () => {});