import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // SPA fallback for dynamic routes
      strict: false
    }),
    paths: {
      base: '' // '' for alliedalgos.github.io, or '/repo-name' for project pages
    }
  },

  vite: {
    server: {
      fs: {
        allow: ['..'] // needed if your project is nested in OneDrive
      }
    }
  }
};

export default config;

