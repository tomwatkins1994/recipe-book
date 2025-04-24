import { describe, expect, it } from 'vitest';
import { scrapeInstagramPosts } from './scrape-intagram-posts';

describe('scrapeInstagramPosts', () => {
    it('should scrape Instagram posts', async () => {
        const urls = ["https://www.instagram.com/p/DI1ngIlg6gz/"]
        const results = await scrapeInstagramPosts(urls);
    
        expect(results.count).toBe(1);
        expect(results.items[0]).toHaveProperty('title');
        expect(results.items[0].title.length).toBeGreaterThan(0);
        expect(results.items[0]).toHaveProperty('url');
        expect(results.items[0].url).toBe(urls[0]);
        expect(results.items[0]).toHaveProperty('caption');
        expect(results.items[0].caption.length).toBeGreaterThan(0);
        expect(results.items[0]).toHaveProperty('image');
        expect(results.items[0].image.length).toBeGreaterThan(0);
    });

    it('should scrape Instagram reels', async () => {
        const urls = ["https://www.instagram.com/simplyrecipes/reel/DGlkDOjPbXF/"]
        const results = await scrapeInstagramPosts(urls); 
    
        expect(results.count).toBe(1);
        expect(results.items[0]).toHaveProperty('title');
        expect(results.items[0].title.length).toBeGreaterThan(0);
        expect(results.items[0]).toHaveProperty('url');
        expect(results.items[0].url).toBe(urls[0]);
        expect(results.items[0]).toHaveProperty('caption');
        expect(results.items[0].caption.length).toBeGreaterThan(0);
        expect(results.items[0]).toHaveProperty('image');
        expect(results.items[0].image.length).toBeGreaterThan(0);
    });
})
