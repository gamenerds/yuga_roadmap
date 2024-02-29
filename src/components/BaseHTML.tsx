import { YugaItem } from "../database/data";

declare global {
  namespace JSX {
    // Adds isParent as an accepted attribute of any html tag
    interface HtmlTag {
      ["is-parent"]?: string;
    }
  }
}

export const BaseHTML = () => {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/scripts/client.js"></script>
        <title>Yuga Roadmap Status (Unofficial)</title>
      </head>
      <body class="min-h-screen flex justify-center">
        <div class="grid grid-flow-row auto-rows-max max-w-lg m-auto">
          <div class="break-after-right">
            <input
              type="search"
              id="search"
              name="search"
              class="border border-gray-600 bg-gray-800 p-2 rounded-lg max-w-lg mb-5 break-after-all text-white"
              placeholder="Start typing to filter/search..."
              onkeyup="search()"
            />
          </div>

          <div
            id="results"
            is-parent={String(true)}
            hx-trigger="load"
            hx-swap="innerHTML"
            hx-get="/roadmap"
          ></div>
        </div>
      </body>
    </html>
  );
};