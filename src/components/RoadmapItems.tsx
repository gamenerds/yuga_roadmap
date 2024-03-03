import { YugaItem } from "../database/data";
import RoadmapItem from "./RoadmapItem";

export default function RoadmapItems({ all_items,}: { all_items: YugaItem[]; }) {
    
  const top_level_items = all_items
    .filter((i) => !i.parent_id)
    .sort((i1, i2) => i1.id - i2.id);
  
  const items_table = top_level_items.map((item) => <RoadmapItem item={item} all_items={all_items}></RoadmapItem>);

  return (
    <>
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
{/* 
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
                data-te-ripple-color="light">
                Category
              </button>
              <button
                type="button"
                class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                data-te-ripple-init
                data-te-ripple-color="light">
                Date
              </button>
            </div>
          </div>   */}
        </div>
        <div id="results">
          {items_table}
        </div>
      </div>
    </>
  );
}
