# Kisaragi's Unduck fork

Instead of waiting for [upstream](https://unduck.link) maintainence (which we're not entitled to) I'm just going to fork it to customize it for myself.

## Setup

```sh
pnpm install
pnpm run dev
```

## Build

```sh
pnpm run build
```

Like upstream, this is a static build. This builds to `dist`.

## Changes

- The main page explains the fork
- Duckduckgo as default default bang. I also haven't bothered building a UI for changing the default bang.
- Provides an OpenSearch description so that desktop Firefox is actually willing to add the URL as a search engine
- ddjp, ddtw, and ddww bangs
