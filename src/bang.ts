import { original } from "../vendor/bang.ts";

interface Service {
  /** Category 1 */
  c?: string;
  /** Domain */
  d: string;
  /** Rank? */
  r: number;
  /** Long name */
  s: string;
  /** Category 2 */
  sc?: string;
  /** Shortcut */
  t: string;
  /** URL; the placeholder is {{{s}}} */
  u: string;
}

export const extra: Service[] = [
  {
    c: "Online Services",
    d: "kagi.com",
    r: 0,
    s: "Kagi",
    sc: "Search (Kagi)",
    t: "kagi",
    u: "https://kagi.com/search?q={{{s}}}",
  },
  {
    c: "Online Services",
    d: "duckduckgo.com",
    r: 0,
    s: "Duckduckgo Worldwide",
    sc: "Search (DDG)",
    t: "ddww",
    u: "https://duckduckgo.com/?kl=wt-wt&q={{{s}}}",
  },
  {
    c: "Online Services",
    d: "duckduckgo.com",
    r: 0,
    s: "Duckduckgo Japan",
    sc: "Search (DDG)",
    t: "ddjp",
    u: "https://duckduckgo.com/?kl=jp-jp&q={{{s}}}",
  },
  {
    c: "Online Services",
    d: "duckduckgo.com",
    r: 0,
    s: "Duckduckgo Taiwan",
    sc: "Search (DDG)",
    t: "ddtw",
    u: "https://duckduckgo.com/?kl=tw-tzh&q={{{s}}}",
  },
  {
    c: "AI",
    d: "www.t3.chat",
    r: 0,
    s: "T3 Chat",
    sc: "AI",
    t: "t3",
    u: "https://www.t3.chat/new?q={{{s}}}",
  },
];

export const bangs: Service[] = [...extra, ...original];
