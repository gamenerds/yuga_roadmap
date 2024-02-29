import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { YugaItem } from "./src/database/data";
import { get_data } from "./src/database/data";
import { BaseHTML } from "./src/components/BaseHTML";
import ItemsTable from "./src/components/ItemsTable";

const app = new Elysia()
  .use(staticPlugin({ prefix: "/" }))
  .use(html())
  .get("/", () => <BaseHTML></BaseHTML>)
  .get("/roadmap", () => itemsHTML())
  .listen(3000);

console.log(`🦊 listening on ${app.server?.hostname}: ${app.server?.port}`);

async function itemsHTML(): Promise<JSX.Element> {
  return get_data().then(
    (items) => build_html(items),
    (reason) => {
      return `Could not retrieve items from database. Reason: ${reason}`;
    },
  );
}

function build_html(all_items: YugaItem[]): JSX.Element {
  //const all_items_sorted = items
  const top_level_items = all_items
    .filter((i) => !i.parent_id)
    .sort((i1, i2) => i1.id - i2.id);

  return (
    <ItemsTable
      top_level_items={top_level_items}
      all_items={all_items}
    ></ItemsTable>
  );
}
