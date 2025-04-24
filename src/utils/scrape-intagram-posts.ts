import { PlaywrightCrawler, Dataset } from "crawlee";
import { v4 as uuidv4 } from 'uuid';

export async function scrapeInstagramPosts(urls: string[]) {
  const datasetName = `insta-${uuidv4()}`; 
  const dataset = await Dataset.open(datasetName);

  const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page }) {
      const title = await page.title();
      const caption = await page.locator("meta[property='og:description']").evaluate((meta) => meta.getAttribute("content"));
      const image = await page.locator("meta[property='og:image']").evaluate((meta) => meta.getAttribute("content"));

      await dataset.pushData({ title, url: request.loadedUrl, caption, image });
    },
    maxRequestsPerCrawl: 1,
  });

  await crawler.run(urls);

  const data = await dataset.getData();
  dataset.drop();

  return data
}