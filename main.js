const { crawlPage } = require('./crawl');

async function main() {
    if (process.argv.length < 3) {
        console.log('No Website Provided');
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log('Too many websites !');
        process.exit(1);
    }
    
    const baseUrl = process.argv[2];
    const pages = await crawlPage(baseUrl, baseUrl, {});
    console.log(pages);
}


// Call Main Function
main()