import { JsxElement } from "typescript";
import { YugaItem, is_parent, id_as_string } from "../database/data";
import { to_string_date } from "../utils/utils";

export default function Item({
  item,
  all_items,
}: {
  item: YugaItem;
  all_items: YugaItem[];
}) {
  const subitems = all_items
    .filter((i) => i.parent_id === item.id)
    .sort(
      (i1, i2) =>
        (i1.date_delivered ? i1.date_delivered : 0) -
        (i2.date_delivered ? i2.date_delivered : 0),
    );

  const id = id_as_string(item);
  const is_section = is_parent(item, subitems.length);
  const children = subitems.map((i) => (
    <Item item={i} all_items={all_items}></Item>
  ));

  var output: JSX.Element;

  if (is_section) {
    output = (
      <>
        <div id={id} is-parent={String(is_section)}>
          <div id={id + "-name"} class="searchable">
            {item.name}
          </div>
          {children}
        </div>
      </>
    );
  } else {
    output = (
      <>
        <div id={id + "-name"} class="ml-10 searchable">
          {item.name} ({to_string_date(item.date_delivered)})
        </div>
        <div id={id + "-desc"} class="ml-20 searchable">
          ${item.desc}
        </div>
      </>
    );
  }

  return <>{output}</>;
}
