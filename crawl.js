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
    standardizeURL
}