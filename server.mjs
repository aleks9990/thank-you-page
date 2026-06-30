import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname);
const port = Number(process.env.PORT || 8787);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (url.pathname === "/typeform-nurovita/B7uWF9GO") {
    const typeformUrl = new URL("https://form.typeform.com/to/B7uWF9GO");
    typeformUrl.search = url.search;

    fetch(typeformUrl)
      .then((typeformResponse) => {
        if (!typeformResponse.ok) {
          throw new Error(`Typeform returned ${typeformResponse.status}`);
        }
        return typeformResponse.text();
      })
      .then((html) => {
        const choiceStylePatch = `<style id="nurovita-typeform-choice-color-patch">
button[role="radio"],
[role="radio"] {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
  border: 1px solid #000000 !important;
  box-shadow: none !important;
  outline: none !important;
  color: #17222e !important;
}

button[role="radio"]:hover,
button[role="radio"]:focus,
button[role="radio"]:active,
button[role="radio"][aria-checked="true"],
[role="radio"]:hover,
[role="radio"]:focus,
[role="radio"]:active,
[role="radio"][aria-checked="true"] {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
  border: 1px solid #000000 !important;
  box-shadow: none !important;
  outline: none !important;
  color: #17222e !important;
}

button[role="radio"] *,
[role="radio"] * {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  color: #17222e !important;
}

[data-qa="ok-button"],
[data-qa="submit-button"],
button[type="submit"],
button[aria-label*="next" i],
button[aria-label*="previous" i],
button[aria-label*="up" i],
button[aria-label*="down" i] {
  background-color: #042F55 !important;
  border-color: #042F55 !important;
  color: #ffffff !important;
}

[data-qa="ok-button"] *,
[data-qa="submit-button"] *,
button[type="submit"] *,
button[aria-label*="next" i] *,
button[aria-label*="previous" i] *,
button[aria-label*="up" i] *,
button[aria-label*="down" i] * {
  color: #ffffff !important;
  fill: #ffffff !important;
  stroke: #ffffff !important;
}

input,
textarea,
[contenteditable="true"],
[role="textbox"] {
  color: #042F55 !important;
  -webkit-text-fill-color: #042F55 !important;
  caret-color: #042F55 !important;
  border-bottom: 1px solid rgba(4, 47, 85, 0.35) !important;
}

input::placeholder,
textarea::placeholder {
  color: rgba(4, 47, 85, 0.45) !important;
  -webkit-text-fill-color: rgba(4, 47, 85, 0.45) !important;
}

fieldset {
  padding-top: 16px !important;
}

[data-qa^="blocktype-short_text"],
[data-qa^="blocktype-long_text"] {
  align-items: start !important;
  align-content: start !important;
  place-items: start stretch !important;
}

[data-qa^="blocktype-short_text"] > div[id],
[data-qa^="blocktype-long_text"] > div[id] {
  padding-top: 16px !important;
}

html,
body,
#root {
  overflow: hidden !important;
}
</style>`;
        const finalChoiceStylePatch = `<style id="nurovita-typeform-radio-final-override">
html body button[role="radio"],
html body div[role="radio"],
html body [data-qa="choice"],
html body [data-qa^="choice"] {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
  border: 1px solid #000000 !important;
  box-shadow: none !important;
  outline: none !important;
}

html body button[role="radio"]:hover,
html body button[role="radio"]:focus,
html body button[role="radio"]:active,
html body button[role="radio"][aria-checked="true"],
html body div[role="radio"]:hover,
html body div[role="radio"]:focus,
html body div[role="radio"]:active,
html body div[role="radio"][aria-checked="true"],
html body [data-qa="choice"]:hover,
html body [data-qa="choice"]:focus,
html body [data-qa="choice"]:active,
html body [data-qa^="choice"]:hover,
html body [data-qa^="choice"]:focus,
html body [data-qa^="choice"]:active {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
  border: 1px solid #000000 !important;
  box-shadow: none !important;
  outline: none !important;
}

html body button[role="radio"] *,
html body div[role="radio"] *,
html body [data-qa="choice"] *,
html body [data-qa^="choice"] * {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

html body input,
html body textarea,
html body [contenteditable="true"],
html body [role="textbox"] {
  color: #042F55 !important;
  -webkit-text-fill-color: #042F55 !important;
  caret-color: #042F55 !important;
  border-bottom: 1px solid rgba(4, 47, 85, 0.35) !important;
}

html body input::placeholder,
html body textarea::placeholder {
  color: rgba(4, 47, 85, 0.45) !important;
  -webkit-text-fill-color: rgba(4, 47, 85, 0.45) !important;
}

html body fieldset {
  padding-top: 16px !important;
}

html body [data-qa^="blocktype-short_text"],
html body [data-qa^="blocktype-long_text"] {
  align-items: start !important;
  align-content: start !important;
  place-items: start stretch !important;
}

html body [data-qa^="blocktype-short_text"] > div[id],
html body [data-qa^="blocktype-long_text"] > div[id] {
  padding-top: 16px !important;
}

html,
html body,
html body #root {
  overflow: hidden !important;
}
</style>`;
        const lateChoiceStylePatch = `<script id="nurovita-typeform-radio-late-override">
(() => {
  const css = \`${finalChoiceStylePatch.replace(/<\/style>$/, "").replace(/^<style[^>]*>/, "")}\`;
  const apply = () => {
    let style = document.getElementById("nurovita-typeform-radio-late-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "nurovita-typeform-radio-late-style";
      document.head.appendChild(style);
    }
    style.textContent = css;
  };
  apply();
  window.addEventListener("load", apply);
  setTimeout(apply, 500);
  setTimeout(apply, 1500);
})();
</script>`;
        const patchedHtml = html
          .replaceAll("#0445AF", "#042F55")
          .replaceAll('"answer":"#042F55"', '"answer":"#FFFFFF"')
          .replaceAll("rgba(255,255,255,0.6)", "#ffffff")
          .replaceAll("rgba(255, 255, 255, 0.6)", "#ffffff")
          .replace("</head>", `${choiceStylePatch}</head>`)
          .replace("</body>", `${finalChoiceStylePatch}${lateChoiceStylePatch}</body>`);
        response.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        });
        response.end(patchedHtml);
      })
      .catch((error) => {
        response.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
        response.end(`Unable to load Typeform: ${error.message}`);
      });
    return;
  }

  const requestedPath = normalize(decodeURIComponent(url.pathname));
  let filePath = resolve(join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, "index.html");
  }

  response.writeHead(200, {
    "Content-Type": types[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
});
