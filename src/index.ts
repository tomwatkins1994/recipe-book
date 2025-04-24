import { PlaywrightCrawler } from "crawlee";

// PlaywrightCrawler crawls the web using a headless browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, pushData, log }) {
    const title = await page.title();
    log.info(`Title of ${request.loadedUrl} is '${title}'`);

    // Wait for caption to load — usually in an <article> element
    await page.waitForSelector("article");

    const caption = await page.locator("meta[property='og:description']").evaluate((meta) => meta.getAttribute("content"));
    const image = await page.locator("meta[property='og:image']").evaluate((meta) => meta.getAttribute("content"));

    // Save results as JSON to `./storage/datasets/default` directory.
    await pushData({ title, url: request.loadedUrl, caption, image });

    // Extract links from the current page and add them to the crawling queue.
    // await enqueueLinks();
  },

  // Uncomment this option to see the browser window.
  // headless: false,

  // Comment this option to scrape the full website.
  maxRequestsPerCrawl: 20,
});

// Add first URL to the queue and start the crawl.
await crawler.run(["https://www.instagram.com/p/DI1ngIlg6gz/"]);
// Export the whole dataset to a single file in `./result.csv`.
await crawler.exportData("./result.csv");

// Or work with the data directly.
const data = await crawler.getData();
console.table(data.items);
