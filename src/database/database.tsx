import get_test_data from "./test_data";

const USE_TEST_DATA = true;

export type YugaItem = {
  id: number;
  parent_id?: number;
  name: string;
  desc?: string;
  thumbnail?: string;
  media?: string;
  link?: string;
  date_delivered?: number;
  date_delivered_end?: number;
  date_promised_original?: number;
  date_promised_latest?: number;
  date_promised_as_string?: string;
  date_for_sorting?: number;
};

export enum SORT_TYPE { "by_category", "by_date" };

export function id_as_string(item: YugaItem): string {
  return item.parent_id === undefined ? String(item.id) : `${item.id}-${item.parent_id}`;
}

export function is_parent(item: YugaItem, subitem_count: number): boolean {
  return subitem_count !== 0 || item.parent_id === undefined || item.parent_id === null;
}

export async function get_data(sort: SORT_TYPE): Promise<YugaItem[]> {
  let items = USE_TEST_DATA ? await get_test_data() : await get_real_data();

  // pick a date to be used for sorting purposes
  items.forEach((i) => {
    if (i.date_delivered) {
      i.date_for_sorting = i.date_delivered;
    } else if (i.date_promised_original) {
      i.date_for_sorting = i.date_promised_original;
    } else if (i.date_promised_latest) {
      i.date_for_sorting = i.date_promised_latest;
    }
  });

  switch (sort) {
    case SORT_TYPE.by_date: {
      return organized_items_by_date(items);
    }
    case SORT_TYPE.by_category: {
      return organized_items_by_category(items); 
    }
    default: {
      return organized_items_by_category(items); 
    }
  }
}

function organized_items_by_date(items: YugaItem[]): YugaItem[] {
  var organized_items: YugaItem[] = [];

  // this is a bad way to filter out sections.
  // TODO: refactor to allow for items that don't have a date but also aren't a section
  // maybe by adding is_section to YugaItem? 
  // (this is due to our mosachistic choice to support n - levels of item hierarchy instead of just 2: section -> item)
  const non_section_items = items.filter(i => i.date_for_sorting !== undefined);

  // sort by that date
  non_section_items.sort((i1, i2) => i1.date_for_sorting && i2.date_for_sorting ? i2.date_for_sorting - i1.date_for_sorting : 0);

  // extract top-level items from the data (the years)
  var years: YugaItem[] = [];
  non_section_items.forEach((i) => {
    var year_as_string: string = "?"

    if (i.date_for_sorting) {
      year_as_string = String(new Date(i.date_for_sorting * 1000).getFullYear());
    }

    var item_for_this_year = years.find((i) => i.name === year_as_string);
    if (!item_for_this_year) {
      item_for_this_year = {
        id: years.length + 1,
        name: year_as_string
      };
      years.push(item_for_this_year);
    }
    i.name = top_parent_of(i, items).name + ": " + i.name;

    // assign new parent id, which is id of the section for the year the item belongs to
    i.parent_id = item_for_this_year.id;
  });

  organized_items = years.concat(non_section_items);
    
  return organized_items;
}

function top_parent_of(item: YugaItem, all_items: YugaItem[]): YugaItem {
  console.log(`looking for parent of item.id ${item.id}, parent_id: ${item.parent_id}`);
  if (item.parent_id) {
    let parent = all_items.findLast(i => i.id === item.parent_id);
    if (parent) {
      return top_parent_of(parent, all_items);
    }
  }

  console.log(`the parent is id: ${item.id}, name: ${item.name} `);
  return item;
}

async function get_real_data(): Promise<YugaItem[]> {
  const response = await fetch(`https://biwdnaleai.execute-api.ap-southeast-1.amazonaws.com/items`);
  const items = await response.json();

  return items;
}

function organized_items_by_category(items: YugaItem[]): YugaItem[] {
  items.sort((i1, i2) => i1.date_for_sorting && i2.date_for_sorting ? i2.date_for_sorting - i1.date_for_sorting : 1);
  return items;
}
