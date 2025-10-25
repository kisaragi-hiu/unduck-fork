import { bangs } from "./bang";
import "./global.css";

const getBang = (t: string) => bangs.find((b) => b.t === t);
const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "ddg";
const defaultBang = getBang(LS_DEFAULT_BANG);

function noSearchDefaultPageRender() {
  const url = `https://unduck-fork.kisaragi-hiu.com?q=%s`;
  const html = (strings: TemplateStringsArray, ...values: any[]) =>
    String.raw({ raw: strings }, ...values);
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = html`
    <div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;"
    >
      <div class="content-container">
        <h1>Kisaragi's Unduck fork</h1>
        <p>
          <a href="https://unduck.link" target="_blank">Unduck</a> with some
          personal customizations. Supports
          <a href="https://duckduckgo.com/bang.html" target="_blank"
            >all of DuckDuckGo's bangs.</a
          >
        </p>
        <h2>Options</h2>
        <fieldset id="defaultBang">
          <legend>Search engine to use when unspecified:</legend>
        </fieldset>
        <h2>Usage</h2>
        <p>Add the following URL as a custom search engine to the browser:</p>
        <div class="url-container">
          <div class="url">${url}</div>
          <button class="copy-button">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
        <p>
          In Firefox, right click on the address bar and press the add button
          there.
        </p>
        <h2>Changes</h2>
        <ul>
          <li>DuckDuckGo as default bang</li>
          <li>
            OpenSearch description to work around desktop Firefox's limitations
          </li>
          <li>
            New bangs: kagi; ddjp, ddtw, ddww (DuckDuckGo region settings)
          </li>
          <li>Bangs are fetched from DuckDuckGo during build</li>
          <li>Option to switch between a few default bangs</li>
        </ul>
      </div>
      <footer class="footer">
        <a href="https://t3.chat" target="_blank">t3.chat</a>
        •
        <a href="https://x.com/theo" target="_blank">theo</a>
        •
        <a href="https://github.com/t3dotgg/unduck" target="_blank">github</a>
        •
        <a href="https://github.com/kisaragi-hiu/unduck-fork" target="_blank"
          >github (this fork)</a
        >
        •
        <a href="https://unduck.link" target="_blank">original</a>
      </footer>
    </div>
  `;
  const defaultBangOption =
    app.querySelector<HTMLFieldSetElement>("#defaultBang")!;
  for (const t of ["ddg", "kagi", "g"]) {
    const input = document.createElement("input");
    if (t === defaultBang?.t) {
      input.checked = true;
    }
    input.name = "defaultBang";
    input.type = "radio";
    input.value = t;
    input.addEventListener("change", () => {
      // This works because in JS each for loop iteration has its own scope
      // This would not work in Python
      localStorage.setItem("default-bang", t);
    });
    const label = document.createElement("label");
    label.innerHTML = `${getBang(t)?.s} (${t})`;
    label.prepend(input);
    defaultBangOption.append(label);
  }

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  const copyIcon = copyButton.querySelector("img")!;
  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(url);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });
}

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;
  if (!selectedBang) return null;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
  if (cleanQuery === "") return `https://${selectedBang.d}`;

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
