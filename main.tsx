import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { SORT_TYPE, YugaItem } from "./src/database/data";
import { get_data } from "./src/database/data";
import { BaseHTML } from "./src/components/BaseHTML";
import RoadmapItems from "./src/components/RoadmapItems";

const app = new Elysia()
  .use(staticPlugin({ prefix: "/" }))
  .use(html())
  .get("/", () => <BaseHTML></BaseHTML>)
  .get("/roadmap", () => roadmap_items_page())
  .get("/roadmap/items/:sort", ({ params: {sort} }) => roadmap_items_page(sort))
  .listen(3000);

console.log(`🦊 listening on ${app.server?.hostname}: ${app.server?.port}`);

function roadmap_items_page(sort_param?: string): Promise<JSX.Element> {
  let sort = SORT_TYPE.by_category;
  if (sort_param && Object.values(SORT_TYPE).includes(sort_param)) {
    sort = SORT_TYPE[sort_param as keyof typeof SORT_TYPE]
  }

  console.log(sort_param, sort);

  return get_data(sort).then(
    (items) => roadmap_items_html(items),
    (reason) => {
      return `Could not retrieve items from database. Reason: ${reason}`;
    },
  );
}

// function get_sorted_items(sort: SORT_TYPE): Promise<YugaItem[]> {
//   return get_data(sort);
// }

function roadmap_items_html(all_items: YugaItem[]): JSX.Element {
  return (
    <RoadmapItems
      all_items={all_items}
    ></RoadmapItems>
  );
}
