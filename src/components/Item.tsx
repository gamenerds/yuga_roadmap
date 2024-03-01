import { JsxElement } from "typescript";
import { YugaItem, is_parent, id_as_string } from "../database/data";
import { to_string_date } from "../utils/utils";

export default function Item({ item, all_items }: { item: YugaItem; all_items: YugaItem[] }) {
  const subitems = all_items
    .filter((i) => i.parent_id === item.id)
    .sort((i1, i2) => (i1.date_delivered ? i1.date_delivered : 0) - (i2.date_delivered ? i2.date_delivered : 0));

  const element_id = id_as_string(item);
  const item_id = String(item.id);
  const is_section = is_parent(item, subitems.length);
  const children = subitems.map((i) => <Item item={i} all_items={all_items}></Item>);

  var output: JSX.Element;

  if (is_section) {
    output = (
      <>
        <div id={element_id} is-parent={String(is_section)} item-id={item_id}>
          <div id={element_id + "-name"} item-id={item_id} class="searchable font-bold">
            {item.name}
          </div>
          {children}
        </div>
      </>
    );
  } else {
    output = (
      <>
        <div id={element_id + "-name"} class="searchable ml-10" item-id={item_id}>
          {item.name} ({to_string_date(item.date_delivered)})
        </div>
        <div id={element_id + "-desc"} class="searchable ml-20" item-id={item_id}>
          {item.desc}
        </div>
      </>
    );
  }

  return <>{output}</>;
}
