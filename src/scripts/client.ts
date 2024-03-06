const root_id = "results";
const search_input_id = "search";
const searchable_class = "searchable";
var incrementingId: number = 1;

function search() {
  console.clear();
  const e = document.getElementById(search_input_id) as HTMLInputElement | null;
  if (!e) {
    console.log(
      `error: couldn't find the textbox with id '${search_input_id}' that should contain the search term.`,
    );
    return;
  }

  const root = document.getElementById(root_id);
  if (!root) {
    console.log(`error: root element '${root_id}' not found, can't search.`);
    return;
  }

  const term = e ? e.value.trim().toLowerCase() : "";
  const regex = new RegExp(term, "gi");

  search_recursive(root, term, regex);
}

function not_empty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function search_recursive(
  e: HTMLElement,
  term: string,
  regex: RegExp,
): boolean {
  var visible = false;

  // the next step requires each element to have a unique id,
  // so let's ensure each element has one
  if (!e.id || e.id.length === 0) {
    e.id = String(incrementingId);
    incrementingId++;
  }

  // using filter(not_empty) b/c js has no compactMap
  const children = Array.from(e.children)
    .map((c) => {
      if (c instanceof HTMLElement) {
        return c;
      }
    })
    .filter(not_empty);

  const is_parent = e.attributes.getNamedItem("is-parent")?.value;
  const item_id = e.attributes.getNamedItem("item-id");

  if (children.length > 0 && !e.classList.contains(searchable_class)) {
    // if we're a parent, we're visible if any children are visible
    children.forEach((c) => {
      visible = search_recursive(c, term, regex) || visible;
    });
    // console.log(`id ${e.id}, searched recursively, visible=${visible}`);
  } else {
    // otherwise we're visible if we're searchable and text inside of us matches the search term
    if (e.classList.contains(searchable_class)) {
      visible = elem_contains_term(e, term, regex) || visible;
    }
  }

  visible = term.length === 0 || visible; // show all if search is empty string

  if (e.attributes.getNamedItem("is-parent")) {
    if (visible) {
      e.classList.remove("hidden");
    } else {
      e.classList.add("hidden");
    }
  }

  return visible;
}

function elem_contains_term(
  e: HTMLElement,
  term: string,
  regex: RegExp,
  options: [] = [],
): boolean {
  var match: boolean = e.innerText?.toLowerCase().includes(term);

  if (term !== "" && term !== undefined && match) {
    e.innerHTML = e.innerText?.replace(regex, "<mark>$&</mark>");
  } else {
    // clear any marks
    let regex1 = new RegExp("<mark>", "gi");
    let regex2 = new RegExp("</mark>", "gi");
    e.innerHTML = e.innerHTML.replace(regex1, "").replace(regex2, "");
  }

  return match;
}

const hasLength = (arr: any[]): boolean => {
  return arr && arr.length !== 0;
};
