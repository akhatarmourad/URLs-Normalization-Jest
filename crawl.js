const { JSDOM } = require('jsdom');

function getURlsFromHTML(htmlBody, baseUrl) {
    const urls = [];
    const DOM = new JSDOM(htmlBody);
    const links = DOM.window.document.querySelectorAll('a');
    
    for (const link of links) {
        if(link.href.slice(0, 1) === '/') {
            // Relative URL
            urls.push(`${baseUrl}${link.href}`)
        }
        else {
            // Absolute URL
            urls.push(link.href);
        }
    }

    return urls;
}

function standardizeURL(url) {
    const URLObj = new URL(url);
    const hostname = URLObj.hostname;
    const pathname = URLObj.pathname;
    const link = `${hostname}${pathname}`;

    if(link.length > 0 && link.endsWith('/')) {
        return link.slice(0,-1);
    }
    
    return link.toLocaleLowerCase();
}

module.exports = {
    standardizeURL,
    getURlsFromHTML
}