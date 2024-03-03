import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { YugaItem } from "./src/database/data";
import { get_data } from "./src/database/data";
import { BaseHTML } from "./src/components/BaseHTML";
import RoadmapItems from "./src/components/RoadmapItems";

enum items_sort_type { "category", "date" }

const app = new Elysia()
  .use(staticPlugin({ prefix: "/" }))
  .use(html())
  .get("/", () => <BaseHTML></BaseHTML>)
  .get("/roadmap", () => roadmap_items_page())
  .listen(3000);

console.log(`🦊 listening on ${app.server?.hostname}: ${app.server?.port}`);

function roadmap_items_page(): Promise<JSX.Element> {
  return get_sorted_items(items_sort_type.category).then(
    (items) => roadmap_items_html(items),
    (reason) => {
      return `Could not retrieve items from database. Reason: ${reason}`;
    },
  );
}

function get_sorted_items(sort_type: items_sort_type): Promise<YugaItem[]> {
  var items = get_data();



  return items;
}

function roadmap_items_html(all_items: YugaItem[]): JSX.Element {
  return (
    <RoadmapItems
      all_items={all_items}
    ></RoadmapItems>
  );
}
