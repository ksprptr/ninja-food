# NinjaFood

> Website of NinjaFood, a fictional street food restaurant in Hradec Králové — a filterable menu, allergens, delivery zones and a blog. A school project at the University of Hradec Králové.

- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Pages](#pages)
- [Project structure](#project-structure)
- [Installation](#installation)
- [Run](#run)
  - [Docker](#docker)
- [Configuration](#configuration)
- [License](#license)

## Prerequisites

- [Node.js](https://nodejs.org) **>= 24 LTS**
- [pnpm](https://pnpm.io) **>= 12** — the exact version is pinned in `packageManager`, `corepack enable` picks it up
- [Docker](https://www.docker.com) with Docker Compose — only to run the site in a container

## Dependencies

| Area       | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Framework  | Next.js (App Router, static export), React                   |
| Styling    | Tailwind CSS                                                 |
| Animation  | Motion                                                       |
| Theme      | next-themes — light and dark mode                            |
| Validation | Zod — every data file is validated when it is loaded         |
| Icons      | Lucide                                                       |
| Tooling    | TypeScript, ESLint, Prettier, Husky, Vitest, Testing Library |
| Container  | nginx — serves the static export                             |

## Pages

| Route               | What it is                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| `/`                 | Home — categories, featured dishes, delivery and the latest articles       |
| `/menu`             | The whole menu, filtered live by diet, cuisine, category, price and energy |
| `/menu/[slug]`      | A dish — price, nutrition, allergens and similar dishes                    |
| `/kategorie`        | All categories                                                             |
| `/kategorie/[slug]` | Dishes of one category, with a switcher between categories                 |
| `/alergeny`         | The 14 allergens and how many dishes contain each of them                  |
| `/zasyti-me-to`     | Satiety calculator — a dish's energy against the daily intake for a weight |
| `/rozvoz`           | Delivery zones, fees and opening hours                                     |
| `/blog`             | Articles from the kitchen                                                  |
| `/faq`              | Frequently asked questions                                                 |

## Project structure

| Path             | What it holds                                                                      |
| ---------------- | ---------------------------------------------------------------------------------- |
| `src/app`        | Routes, components used by a single route, metadata, sitemap, robots and OG image  |
| `src/components` | Shared React components, grouped by their purpose                                  |
| `src/common`     | Enums, types, Zod validations and the functions reading the data                   |
| `src/data`       | Content as JSON — dishes, categories, cuisines, allergens, delivery, articles, FAQ |
| `public`         | Logo, icons and the dish illustrations                                             |
| `tests`          | Vitest tests                                                                       |

## Installation

```bash
# Install the dependencies
pnpm install

# Create the local env file from the example
cp .env.example .env
```

## Run

```bash
# Development server on http://localhost:3000
pnpm dev
```

| Command       | What it does                                |
| ------------- | ------------------------------------------- |
| `pnpm dev`    | development server on port `3000`           |
| `pnpm build`  | static export of the whole site into `out/` |
| `pnpm test`   | the test suite                              |
| `pnpm lint`   | lint and fix the sources                    |
| `pnpm format` | format the sources with Prettier            |

Husky runs `pnpm lint` before every commit.

### Docker

Build the image and run the site in a container on http://localhost:8080:

```bash
docker compose up -d --build
```

The `Dockerfile` has two stages: the first one installs the dependencies and runs `pnpm build`, the second one serves the exported `out/` with nginx. The running container has no Node.js, it runs as an unprivileged user and checks its own health on `/robots.txt`.

Without Compose:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:8080 -t ninja-food .
docker run -d -p 8080:8080 ninja-food
```

## Configuration

Configuration lives in `.env`, created from `.env.example`. Docker Compose reads the same file.

| Variable               | Default                 | What it is                                                        |
| ---------------------- | ----------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public address of the site, used in the sitemap and in robots.txt |
| `NINJA_FOOD_PORT`      | `8080`                  | Host port of the Docker container                                 |

`NEXT_PUBLIC_SITE_URL` is inlined into the pages when they are built, so changing it needs a new build. For the container that means `docker compose up -d --build`.

## License

[MIT](./LICENSE) © Petr Kašpar
