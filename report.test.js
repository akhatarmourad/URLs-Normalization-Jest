const { sortPages } = require('./report');
const { test, expect } = require('@jest/globals');


test('sortPages', () => {
    const input = {
        'https://www.instagram.com/devdescom': 1,
        'https://www.instagram.com/devdescom/posts': 4
    };
    const actual = sortPages(input);
    const expected = [
        ['https://www.instagram.com/devdescom/posts', 4],
        ['https://www.instagram.com/devdescom', 1]
    ];

    expect(actual).toEqual(expected);
});