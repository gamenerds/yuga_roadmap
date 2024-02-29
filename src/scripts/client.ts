const root_id = "results";
const searchable_class = "searchable";
const visibility: Record<string, string> = {};
var incrementingId: number = 1;

function search() {
  console.clear();
  const e = document.getElementById("search") as HTMLInputElement | null;
  const term = e ? e.value.toLowerCase() : "";

  const root = document.getElementById(root_id);
  if (!root) {
    console.log(`error: root element '${root_id}' not found, can't search.`);
    return;
  }

  console.log(visibility["1-wrapper"]);

  search_recursive(root, term);
  console.log(visibility["1-wrapper"]);
}

function not_empty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function search_recursive(e: HTMLElement, term: string): boolean {
  //console.log(`starting recursive for <${e.tagName} id=${e.id}>`);

  // the next step requires each element to have a unique id,
  // so let's ensure each element has one
  if (!e.id || e.id.length === 0) {
    e.id = String(incrementingId);
    incrementingId++;
  }

  // remember original style.display setting
  // so that we know what to assign back to an element when it's un-hidden
  if (visibility[e.id] === undefined) {
    visibility[e.id] = e.style.display;
  }

  var visible = false;

  // using filter(not_empty) b/c typescript has no compactMap
  const children = Array.from(e.children)
    .map((c) => {
      if (c instanceof HTMLElement) {
        return c;
      }
    })
    .filter(not_empty);

  const isParent = e.attributes.getNamedItem("is-parent")?.value;

  if (Boolean(isParent)) {
    // if we're a parent, we're visible if any children are visible
    children.forEach((c) => {
      visible = search_recursive(c, term) || visible;
    });
    console.log(`id ${e.id}, searched recursively, visible=${visible}`);
  } else {
    // otherwise we're visible if anything inside of us matches the search term
    var innerTexts = [e.innerText];
    children.forEach((c) => {
      if (c.className.includes(searchable_class)) {
        innerTexts.push(c.innerText);
      }
    });

    innerTexts.forEach(
      (t) => (visible = text_has_search_Term(t, term) || visible),
    );

    console.log(
      `id ${e.id}, searching texts: ${innerTexts}, visible=${visible}`,
    );
  }

  visible = term.length === 0 || visible;

  if (visible) {
    children.forEach((c) => (c.style.display = visibility[e.id]));
  } else {
    children.forEach((c) => (c.style.display = "none"));
  }
  console.log(
    `Finished ${e.id}, display: ${e.style.display}, visible=${visible}`,
  );

  return visible;
}

function text_has_search_Term(
  text: string,
  term: string,
  options: [] = [],
): boolean {
  return text?.toLowerCase().includes(term);
}

const hasLength = (arr: any[]): boolean => {
  return arr && arr.length !== 0;
};
