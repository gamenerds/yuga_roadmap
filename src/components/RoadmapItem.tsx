import { JsxElement } from "typescript";
import { YugaItem, is_parent, id_as_string } from "../database/database";
import { to_string_date } from "../utils/utils";
import RoadmapDate from "./RodmapDate";

export default function RoadmapItem({ item, all_items }: { item: YugaItem; all_items: YugaItem[] }) {
  const subitems = all_items
    .filter((i) => i.parent_id === item.id);

  const element_id = id_as_string(item);
  const item_id = String(item.id);
  const is_parent_item = is_parent(item, subitems.length);
  const children = subitems.map((i) => <RoadmapItem item={i} all_items={all_items}></RoadmapItem>);

  var output: JSX.Element;

  if (is_parent_item) {
    output = (
      <>
        <div id={element_id} is-parent={String(is_parent_item)} item-id={item_id} class="collapse content-start">
          <input type="checkbox" checked />
          <div id={element_id + "-name"} item-id={item_id} class="searchable collapse-title text-lg font-bold">
            {item.name}
          </div>
          <div id={element_id + "-content"} class="collapse-content ml-10" item-id={item_id}>
            {children}
          </div>
        </div>
      </>
    );
  } else {
    output = (
      <>
        <div id={element_id} is-parent={String(is_parent_item)} item-id={item_id} class="collapse content-start">
          <input type="checkbox" checked />
          <div class="collapse-title" item-id={item_id}>
            <span id={element_id + "-name"} class="searchable float-left">
              {item.name}
            </span>{" "}
            <span id={element_id + "-date"} class="float-right">
              <RoadmapDate item={item}></RoadmapDate>
            </span>
          </div>
          <div id={element_id + "-content"} item-id={item_id} class="collapse-content ml-10">
            <div id={element_id + "-desc"} class="searchable" item-id={item_id}>
              {item.desc}
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{output}</>;
}
