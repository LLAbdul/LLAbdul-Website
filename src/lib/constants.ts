// CommunityDragon asset URLs
const CDN = "https://raw.communitydragon.org/latest/plugins";

export const RANK_EMBLEMS = {
  challenger: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-challenger.png`,
  grandmaster: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-grandmaster.png`,
  master: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-master.png`,
  diamond: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-diamond.png`,
  emerald: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-emerald.png`,
  platinum: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png`,
  gold: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-gold.png`,
  silver: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-silver.png`,
  bronze: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-bronze.png`,
  iron: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-iron.png`,
} as const;

export const RANK_MINI_CRESTS = {
  challenger: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/challenger.png`,
  grandmaster: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/grandmaster.png`,
  master: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/master.png`,
  diamond: `${CDN}/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/diamond.png`,
} as const;

export const POSITION_ICONS = {
  top: `${CDN}/rcp-fe-lol-champ-select/global/default/svg/position-top.svg`,
  jungle: `${CDN}/rcp-fe-lol-champ-select/global/default/svg/position-jungle.svg`,
  mid: `${CDN}/rcp-fe-lol-champ-select/global/default/svg/position-middle.svg`,
  bot: `${CDN}/rcp-fe-lol-champ-select/global/default/svg/position-bottom.svg`,
  support: `${CDN}/rcp-fe-lol-champ-select/global/default/svg/position-utility.svg`,
} as const;
