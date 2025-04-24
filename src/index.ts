import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  async requestHandler({ request, page, pushData }) {
    const title = await page.title();
    const caption = await page.locator("meta[property='og:description']").evaluate((meta) => meta.getAttribute("content"));
    const image = await page.locator("meta[property='og:image']").evaluate((meta) => meta.getAttribute("content"));

    await pushData({ title, url: request.loadedUrl, caption, image });
  },
  maxRequestsPerCrawl: 1,
});

await crawler.run(["https://www.instagram.com/p/DI1ngIlg6gz/"]);

const data = await crawler.getData();
console.table(data.items);
