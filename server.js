import express from "express";

const app = express();

// Set static folder
app.use(express.static("public")); // <- folder for index.html and others

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request to get all roadmap items
app.get("/roadmap", async (req, res) => {
  const items = [
    {
      id: 1,
      name: "Apes",
      desc: "lala",
      parent_id: null,
      thumbnail: "",
    },
    {
      id: 2,
      name: "Otherside",
      desc: "lala",
      parent_id: null,
      thumbnail: "",
    },
    {
      id: 3,
      name: "Meebits",
      desc: "lala",
      parent_id: null,
      thumbnail: "",
    },
    {
      id: 4,
      name: "Punks",
      desc: "lala",
      parent_id: null,
      thumbnail: "",
    },
    {
      id: 5,
      name: "Moonbirds",
      desc: "kakaw",
      parent_id: null,
      thumbnail: "",
    },
    {
      id: 6,
      name: "Art",
      desc: "viva la artsua (sips espresso)",
      parent_id: null,
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

  const sorted_items = items.sort((i1, i2) => i1.id - i2.id);
  //   console.log(sorted_items);
  const top_level_items = items.filter((i) => i.parent_id === null);

  //console.log(sorted_items);

  const html =
    '<div class="grid grid-flow-row auto-rows-max">' +
    top_level_items
      .map((item) => {
        const subitems = items
          .filter((i) => i.parent_id === item.id)
          .sort((i1, i2) => i1.date_delivered > i2.date_delivered);

        var result = `<div>${item.name}</div>`;
        result += subitems
          .map((i) => `<div class="ml-20">${i.name}</div>`)
          .join("");

        return result;
      })
      .join("") +
    "</div>";

  res.send(html);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
