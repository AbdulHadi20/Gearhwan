// @ts-check
import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk(),react()],
  adapter: vercel(),
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  }
});