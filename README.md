# Kisaragi's Unduck fork

Instead of waiting for upstream maintainence (which we're not entitled to) I'm just going to fork it to customize it for myself.

## Setup

```sh
pnpm install
pnpm run dev
```

## Build

```sh
pnpm run build
```

Like upstream, this is a static build.

# Unduck

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

```
https://unduck.link?q=%s
```

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

I solved this by doing all of the work client side. Once you've went to https://unduck.link once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.
