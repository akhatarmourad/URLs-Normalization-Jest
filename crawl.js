const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseUrl) {
    const urls = [];
    const DOM = new JSDOM(htmlBody);
    const links = DOM.window.document.querySelectorAll('a');
    
    for (const link of links) {
        if(link.href.slice(0, 1) === '/') {
            // Relative URL
            try {
                const urlObject = new URL(`${baseUrl}${link.href}`);
                urls.push(urlObject.href);
            }
            catch(error) {
                console.log(`Invalid Error : ${error.message}`);
            }
        }
        else {
            // Absolute URL
            try {
                const urlObject = new URL(link.href);
                urls.push(urlObject.href);
            }
            catch(error) {
                console.log(`Invalid absolute URL : ${error.message}`);
            }
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

async function crawlPage(baseUrl, currentUrl, pages) {
    
    // Check if baseUrl & currentUrl are matching
    const baseUrlObject = new URL(baseUrl);
    const currentUrlObject = new URL(currentUrl);

    if(baseUrlObject.hostname !== currentUrlObject.hostname) {
        return pages;
    }

    // Check if URL is already crawled or not
    const normalizedCurrentUrl = standardizeURL(currentUrl);

    if(pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++;
        return pages;
    }

    // If the URL is not already seen
    pages[normalizedCurrentUrl] = 1;
    console.log(`Start Crawling URL : ${currentUrl}`);

    try {
        const response = await fetch(currentUrl);

        // Check for errors status code
        if (response.status > 399) {
            console.log(`Error in fetch with status code : ${response.status}`);
            return pages;
        }

        // Check for content type of response
        const contentType = response.headers.get('content-type');
        if(!contentType.includes("text/html")) {
            console.log(`No HTML, content ype : ${contentType}`);
            return pages;
        }

        // Extract URLs from HTML
        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseUrl);

        // Recusively crawling the pages/links
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseUrl, nextURL, pages);
        }
    }
    catch(error) {
        console.log(`Error in fetch : ${error.message}`);
    }

    return pages;
}

module.exports = {
    standardizeURL,
    getURLsFromHTML,
    crawlPage
}