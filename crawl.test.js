const { standardizeURL, getURLsFromHTML, getURlsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('standardizeURL Strip Strailing Slashes', function() {
    const input = 'https://www.instagram.com/devdescom';
    const actual = standardizeURL(input);
    const expected = 'www.instagram.com/devdescom';

    // I expect that Actual result is equal to Expected result
    expect(actual).toEqual(expected);
});

test('standardizeURL Capitals', () => {
    const input = 'https://www.instagram.com/DEVDESCOM';
    const current = standardizeURL(input);
    const expected = 'www.instagram.com/devdescom';

    expect(current).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://www.instagram.com/devdescom">DEVDES Instagram</a>
            </body>
        </html>
    `;

    const inputBaseURL = 'https://www.instagram.com/devdescom';
    const actual = getURlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://www.instagram.com/devdescom'];

    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/devdescom/">DEVDES Instagram</a>
            </body>
        </html>
    `;

    const inputBaseURL = 'https://www.instagram.com';
    const actual = getURlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://www.instagram.com/devdescom/'];

    expect(actual).toEqual(expected);
});

test('getURLsFromHTML multiple', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/devdescom/">DEVDES Instagram</a>
                <a href="https://www.instagram.com/managital/">Managital</a>
            </body>
        </html>
    `;

    const inputBaseURL = 'https://www.instagram.com';
    const actual = getURlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://www.instagram.com/devdescom/', 'https://www.instagram.com/managital/'];

    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="not a path">Invalid URL</a>
                <a href="https://www.instagram.com/managital/">Managital</a>
            </body>
        </html>
    `;

    const inputBaseURL = 'https://www.instagram.com';
    const actual = getURlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://www.instagram.com/managital/'];

    expect(actual).toEqual(expected);
});