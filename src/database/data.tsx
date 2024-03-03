const USE_TEST_DATA = true;

export type YugaItem = {
  id: number;
  parent_id?: number;
  name: string;
  desc: string;
  thumbnail: string;
  media?: string;
  link?: string;
  date_delivered?: number;
  date_delivered_end?: number;
  date_promised_original?: number;
  date_promised_latest?: number;
  date_promised_as_string?: string;
};

export function id_as_string(item: YugaItem): string {
  return item.parent_id === undefined ? String(item.id) : `${item.id}-${item.parent_id}`;
}

export function is_parent(item: YugaItem, subitem_count: number): boolean {
  return subitem_count !== 0 || item.parent_id === undefined || item.parent_id === null;
}

export async function get_data(): Promise<YugaItem[]> {
  return USE_TEST_DATA ? await get_test_data() : await get_real_data();
}

async function get_real_data(): Promise<YugaItem[]> {
  const response = await fetch(`https://biwdnaleai.execute-api.ap-southeast-1.amazonaws.com/items`);
  const items = await response.json();

  return items;
}

async function get_test_data(): Promise<YugaItem[]> {
  return [
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
      name: "Gaming",
      desc: "lala",
      thumbnail: "",
    },
    {
      id: 4,
      name: "Punks & Meebits",
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
      date_promised_original: 0,
      date_promised_latest: 0,
    },
    {
      id: 9,
      parent_id: 2,
      name: "Apes Come Home",
      desc: "Third trip to the Otherside, reveal of the virtual club house + each BAYC ape gets a 3D model.",
      thumbnail: "",
      media: "",
      link: "https://news.yuga.com/apes-come-home",
      date_delivered: 1709164800,
      date_delivered_end: 0,
      date_promised_original: 0,
      date_promised_latest: 0,
    },
    {
      id: 10,
      parent_id: 4,
      name: "Acquisition of Punks, Meebits",
      desc: "Larva Labs remains independent and keeps control of Autoglyphs project while IP of Punks and Meebits is transferred to Yuga. Yuga will grant full commercial rights to holders of the nfts.",
      thumbnail: "",
      media: "",
      link: "https://www.larvalabs.com/blog/2022-3-11-18-0/yuga-labs-acquires-cryptopunks-and-meebits",
      date_delivered: 1646956800,
      date_delivered_end: 0,
      date_promised_original: 0,
      date_promised_latest: 0,
    },
    {
      id: 11,
      parent_id: 5,
      name: "Acquisition of PROOF Collective",
      desc: "This includes Moonbirds, Mythics, Oddities, and Grails, plus the team and cash reserves. Kevin Rose, the founder of Moonbirds, is moved to advisor role.",
      thumbnail: "",
      media: "",
      link: "https://nftnow.com/news/yuga-labs-acquires-proof/",
      date_delivered: 1708214400,
      date_delivered_end: 0,
      date_promised_original: 0,
      date_promised_latest: 0,
    },
    {
      id: 12,
      parent_id: 6,
      name: "TwelveFold Ordinals Collection",
      desc: "300-piece generative art collection inscribed onto satoshis.",
      thumbnail: "",
      media: "",
      link: "https://bitcoinmagazine.com/culture/yuga-labs-introduces-first-bitcoin-ordinals-collection",
      date_delivered: 1677542400,
      date_delivered_end: 0,
      date_promised_original: 0,
      date_promised_latest: 0,
    },
    {
      id: 13,
      parent_id: 6,
      name: "Bitcoin Prizes for Solving Ordinal Puzzles",
      desc: "13 weeks, one puzzle per week. 12 of the puzzles paid out 0.12BTC each and the prize for the 13th was a TwelveFold ordinal.",
      thumbnail: "",
      media: "",
      link: "https://nftnow.com/news/yuga-labs-bitcoin-ordinals-twelvefold-cipher-puzzles/",
      date_delivered: 1677542400,
      date_delivered_end: 0,
      date_promised_original: 0,
      date_promised_latest: 0,
    },
    {
      id: 14,
      parent_id: 3,
      name: "Dookey Dash Unclogged",
      desc: "The web2 version of Dookey Dash for the masses.",
      thumbnail: "",
      media: "",
      link: "https://news.yuga.com/apes-come-home",
      date_delivered: 0,
      date_delivered_end: 0,
      date_promised_original: 0,
      date_promised_latest: 0,
      date_promised_as_string: "Spring 2024",
    },
  ];
}
