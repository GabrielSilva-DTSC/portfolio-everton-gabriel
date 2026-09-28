import { defineConfig } from 'astro/config';

// Localmente a base é /. No Actions, usamos o dono e o nome reais do repositório.
const repository = process.env.GITHUB_REPOSITORY;
const [owner, name] = repository?.split('/') ?? [];
const site = process.env.SITE_URL || (owner ? `https://${owner}.github.io` : undefined);
const base = process.env.BASE_PATH || (name && name.toLowerCase() !== `${owner}.github.io`.toLowerCase() ? `/${name}/` : '/');

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
