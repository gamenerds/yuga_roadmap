import { YugaItem } from "../database/data";
import ItemsTable from "./RoadmapItems";

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

        <div hx-trigger="load" hx-target="#results" hx-get="/roadmap" class="w-2/3 max-w-3xl">
        <div class="grid grid-flow-row auto-rows-max m-auto">
          <div class="mb-5 mt-4">
            <input
              type="search"
              id="search"
              name="search"
              class="border border-gray-600 bg-gray-800 p-2 rounded-lg max-w-2xl break-after-all text-white"
              placeholder="Start typing to filter.."
              onkeyup="search()"
            />

            <div class="float-right">
              <span class="pr-5">
                Sort by:
              </span>  
              <div
                class="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  role="group">
                <button
                  type="button"
                  class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  hx-target="#results"
                  hx-get="/roadmap/items/by_category">
                  Category
                </button>
                <button
                  type="button"
                  class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  hx-target="#results"
                  hx-get="/roadmap/items/by_date">
                  Date
                </button>
              </div>
            </div>  
          </div>
            <div id="results">
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
