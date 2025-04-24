import { PlaywrightCrawler } from "crawlee";

export async function scrapeInstagramPosts(urls: string[]) {
  const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, pushData }) {
      const title = await page.title();
      const caption = await page.locator("meta[property='og:description']").evaluate((meta) => meta.getAttribute("content"));
      const image = await page.locator("meta[property='og:image']").evaluate((meta) => meta.getAttribute("content"));

      await pushData({ title, url: request.loadedUrl, caption, image });
    },
    maxRequestsPerCrawl: 1,
  });

  await crawler.run(urls);

  const data = await crawler.getData();
  return data
}