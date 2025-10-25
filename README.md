# Kisaragi's Unduck fork

[Unduck](https://unduck.link) is nice, but there are some changes I need to make it fit my needs. So here's a fork to implement them.

Instead of waiting for [upstream](https://github.com/t3dotgg/unduck) to add features (which we're not entitled to) I'm just going to fork it to customize it for myself.

## Setup

```sh
pnpm install
make dev
```

I do some stuff at build time (particularly fetching bangs from DuckDuckGo) and want them to be explicitly done at build time, which is why I'm using Make.

## Build

```sh
make build
```

Like upstream, this is a static build. This builds to `dist`.

## Changes

- The main page explains the fork
- Duckduckgo as default default bang. I also haven't bothered building a UI for changing the default bang.
- Provides an OpenSearch description so that desktop Firefox is actually willing to add the URL as a search engine
- ddjp, ddtw, and ddww bangs
