function sortPages(pages) {
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);

    return pagesArray;
}

function printReport(pages) {
    console.log('========================== Pages Report ==========================');
    const sortedPages = sortPages(pages);

    for(const page of sortedPages) {
        const url = page[0];
        const hits = page[1];

        console.log(`Page URL : ${url} | Hits : ${hits}`);
        console.log('-------------------------------------------------------------------------------------------------')
    }
}

module.exports = {
    sortPages,
    printReport
}