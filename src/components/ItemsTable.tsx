import { YugaItem } from "../database/data";
import Item from "./Item";

export default function ItemsTable({
  top_level_items,
  all_items,
}: {
  top_level_items: YugaItem[];
  all_items: YugaItem[];
}) {
  const table = top_level_items.map((item) => <Item item={item} all_items={all_items}></Item>);

  return <>{table}</>;
}
