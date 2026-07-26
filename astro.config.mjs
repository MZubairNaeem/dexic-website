import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://dexic.tech',
  output: 'server',
  adapter: vercel()
})
