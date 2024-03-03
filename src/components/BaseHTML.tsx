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
        <div hx-trigger="load" hx-swap="innerHTML" hx-get="/roadmap" class="w-2/3 max-w-3xl"></div>
      </body>
    </html>
  );
};
