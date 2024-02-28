import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";

new Elysia()
  .use(staticPlugin({ prefix: "" }))
  .use(html())
  .get("/roadmap", async (request, response) => {
    const all_items = [
      {
        id: 1,
        name: "Apes",
        desc: "lala",
        thumbnail: "",
      },
      {
        id: 2,
        name: "Otherside",
        desc: "lala",
        thumbnail: "",
      },
      {
        id: 3,
        name: "Meebits",
        desc: "lala",
        thumbnail: "",
      },
      {
        id: 4,
        name: "Punks",
        desc: "lala",
        thumbnail: "",
      },
      {
        id: 5,
        name: "Moonbirds",
        desc: "kakaw",
        thumbnail: "",
      },
      {
        id: 6,
        name: "Art",
        desc: "viva la artsua (sips espresso)",
        thumbnail: "",
      },
      {
        id: 7,
        parent_id: 1,
        name: "Apefest #1 (NYC-Brooklyn)",
        desc: "OMFG THE BEST",
        thumbnail: "",
        media: "",
        date_delivered: 1635638400,
        date_delivered_end: 1635983999,
        date_estimated: 0,
        date_promised_original: 0,
        date_promised_latest: 0,
      },
      {
        id: 8,
        parent_id: 1,
        name: "Apefest #2 (NYC-Pier17)",
        desc: 'The second Apefest took place @ Pier 17 in New York City between June 20 - 23, 2022 for verified apes and mutants only (and their +1s). Same venue was used every night, with different musical guests each time. Due to main area being on the rooftop, one of the nights apes got rained on. Snoop Dogg & Eminem appeared live to premier their new music video "From the D 2 the LBC" on the last night of the event.',
        thumbnail: "",
        media: "",
        date_delivered: 1655683200,
        date_delivered_end: 1656028799,
        date_estimated: 0,
        date_promised_original: 0,
        date_promised_latest: 0,
      },
    ];

    //   const response = await fetch(
    //     `https://biwdnaleai.execute-api.ap-southeast-1.amazonaws.com/items`
    //   );
    //   const items = await response.json();

    //   console.log(items);

    //const all_items_sorted = items
    const top_level_items = all_items
      .filter((i) => !i.parent_id)
      .sort((i1, i2) => i1.id - i2.id);

    function to_string_date(unix_time) {
      const date = new Date(unix_time * 1000);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      return date.toLocaleDateString("en-US", options);
    }

    function html_for_items(items) {
      return items
        .map((item) => {
          // generate id for html elements
          const id_as_string =
            item.parent_id === undefined
              ? String(item.id)
              : `${item.id}-${item.parent_id}`;

          const subitems = all_items
            .filter((i) => i.parent_id === item.id)
            .map((i) => ({
              ...i,
              date_delivered_string: to_string_date(i.date_delivered),
            }))
            .sort((i1, i2) => i1.date_delivered - i2.date_delivered);

          const is_parent =
            subitems.length !== 0 ||
            item.parent_id === undefined ||
            item.parent_id === null;

          // generate html
          var result = `<div id="${id_as_string}" 
              isParent="${is_parent}">`;

          if (is_parent) {
            result += `<div id="${id_as_string}-name" class="searchable">${item.name}</div>`;
            result += html_for_items(subitems);
          } else {
            result += `<div id="${id_as_string}-name" class="ml-10 searchable">${item.name} (${item.date_delivered_string})</div>`;
            result += `<div id="${id_as_string}-desc" class="ml-20 searchable">${item.desc}</div>`;
          }

          result += "</div>"; // ending tag to the div grid

          return result;
        })
        .join("");
    }

    const html = html_for_items(top_level_items);

    //console.log(html);

    return html;
  })
  .listen(3000, () => console.log("Started listening on port 3000"));
