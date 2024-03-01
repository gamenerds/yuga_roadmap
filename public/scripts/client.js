const root_id = "results";
const searchable_class = "searchable";
const visibility = {};
var incrementingId = 1;
function search() {
    console.clear();
    const e = document.getElementById("search");
    const term = e ? e.value.toLowerCase() : "";
    const root = document.getElementById(root_id);
    if (!root) {
        console.log(`error: root element '${root_id}' not found, can't search.`);
        return;
    }
    const dict = {};
    search_recursive(root, term, dict);
    // console.log(dict);
}
function not_empty(value) {
    return value !== null && value !== undefined;
}
function search_recursive(e, term, item_visibility = {}) {
    var visible = false;
    var regex = undefined;
    if (term && term !== "") {
        regex = new RegExp(term, "gi");
    }
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
    // using filter(not_empty) b/c js has no compactMap
    const children = Array.from(e.children)
        .map((c) => {
        if (c instanceof HTMLElement) {
            return c;
        }
    })
        .filter(not_empty);
    const isParent = e.attributes.getNamedItem("is-parent")?.value;
    const item_id = e.attributes.getNamedItem("item-id");
    if (Boolean(isParent)) {
        // if we're a parent, we're visible if any children are visible
        children.forEach((c) => {
            visible = search_recursive(c, term, item_visibility) || visible;
        });
        // console.log(`id ${e.id}, searched recursively, visible=${visible}`);
    }
    else {
        // otherwise we're visible if anything inside of us matches the search term
        var innerTexts = [e.innerText];
        visible = elem_contains_term(e, term, regex) || visible;
        children.forEach((c) => {
            if (c.classList.contains(searchable_class)) {
                // visible = text_has_search_Term(c.innerText, term) || visible;
                visible = elem_contains_term(c, term, regex) || visible;
                // innerTexts.push(c.innerText);
            }
        });
        // innerTexts.forEach(
        //   (t) => (visible = text_has_search_Term(t, term) || visible),
        // );
    }
    if (item_id && visible) {
        item_visibility[item_id.value] = visible;
    }
    visible = term.trim().length === 0 || visible; // show all if search is empty string
    // a yuga item could be represented as many html tags (div for the name, divs for dates, etc)
    // if any of them contain the search string, then the whole yuga item should stay visible
    var other_part_of_same_item_is_visible = false;
    if (item_id) {
        other_part_of_same_item_is_visible = item_visibility[item_id.value];
    }
    if (visible || other_part_of_same_item_is_visible) {
        children.forEach((c) => {
            // keep visible all html tags that belong to this yuga item id
            // for ex: we have a parent div container for the section + a div that shows actual section name/text
            // so here we ensure not only the div container stays visible but also the child div that shows the name
            const c_item_id = c.attributes.getNamedItem("item-id");
            if (c_item_id && item_visibility[c_item_id.value] === true) {
                c.classList.remove("hidden");
            }
        });
        e.classList.remove("hidden");
    }
    else if (!other_part_of_same_item_is_visible) {
        // hide as long as this item doesn't have any subitems that should be visible (satisfy the search)
        children.forEach((c) => {
            c.classList.add("hidden");
        });
        e.classList.add("hidden");
    }
    return visible;
}
function elem_contains_term(e, term, regex, options = []) {
    var text = e.innerText;
    var match = text?.toLocaleLowerCase().includes(term);
    if (regex) {
        e.innerHTML = e.innerText.replace(regex, "<mark>$&</mark>");
    }
    else {
        // clear any marks
        let regex1 = new RegExp("<mark>", "gi");
        let regex2 = new RegExp("</mark>", "gi");
        e.innerHTML = e.innerHTML.replace(regex1, "").replace(regex2, "");
    }
    return match;
}
function text_has_search_Term(text, term, options = []) {
    return text?.toLowerCase().includes(term);
}
const hasLength = (arr) => {
    return arr && arr.length !== 0;
};
