import { YugaItem } from "../database/database";
import RoadmapItem from "./RoadmapItem";

export default function RoadmapItems({ all_items,}: { all_items: YugaItem[]; }) {
    
  const top_level_items = all_items
    .filter((i) => !i.parent_id)
    .sort((i1, i2) => i1.id - i2.id);
  
  const items_table = top_level_items.map((item) => <RoadmapItem item={item} all_items={all_items}></RoadmapItem>);

  return (
    <>
      {items_table}
    </>
  );
}
