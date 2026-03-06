import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 1. MUST be your custom domain for the sitemap to be valid
  site: 'https://alliedalgos.org', 
  
  // 2. Helps Google treat alliedalgos.org/about and alliedalgos.org/about/ as one page

  integrations: [
    sitemap({
      // Filters out the 404 page so Google doesn't try to index it
      filter: (page) => page !== 'https://alliedalgos.org/404/',
      serialize(item) {
        // High priority for your main landing page
        if (item.url === 'https://alliedalgos.org/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        return item;
      },
    })
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});