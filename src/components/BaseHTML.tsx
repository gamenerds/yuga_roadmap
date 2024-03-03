import { YugaItem } from "../database/data";

declare global {
  namespace JSX {
    // Adds isParent as an accepted attribute of any html tag
    interface HtmlTag {
      ["is-parent"]?: string;
      ["item-id"]?: string;
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
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/scripts/client.js"></script>
        <style>
          mark &#123;background-color: #D3D3D3;&#125;
          .collapse-title, input[type=checkbox] &#123;
            min-height: 2rem;
            padding: 0.2rem;
          &#125;
          .collapse-content &#123;
            min-height: 1.75rem;
          &#125;
          .collapse:not(.collapse-open)&gt;.collapse-content &#123;
            min-height: 0rem;
            padding: 0.2rem;
            padding-bottom: 0.5rem;
          &#125;
          .collapse:not(.collapse-close)&gt;:where(input[type=checkbox]:checked ~ .collapse-content) &#123;
            padding-bottom: 0.5rem;
          &#125;
        </style>
        <title>Yuga Roadmap Status (Unofficial)</title>
      </head>
      <body class="flex justify-center">
        <div class="grid grid-flow-row auto-rows-max w-2/3 max-w-3xl m-auto">
          <div class="break-after-right">
            <input
              type="search"
              id="search"
              name="search"
              class="border border-gray-600 bg-gray-800 p-2 rounded-lg max-w-lg mb-5 break-after-all text-white"
              placeholder="Start typing to filter.."
              onkeyup="search()"
            />
          </div>

          <div id="results" is-parent={String(true)} hx-trigger="load" hx-swap="innerHTML" hx-get="/roadmap"></div>
        </div>
      </body>
    </html>
  );
};
