// Shared TypeScript interfaces for the League API

// Raw API data interfaces
export interface RawChampionData {
  id: number;
  name: string;
  description: string;
  alias: string;
  contentId: string;
  squarePortraitPath: string;
  roles: string[];
}

export interface RawItemData {
  id: number;
  name: string;
  description: string;
  active: boolean;
  inStore: boolean;
  from: number[];
  to: number[];
  categories: string[];
  maxStacks: number;
  requiredChampion: string;
  requiredAlly: string;
  requiredBuffCurrencyName: string;
  requiredBuffCurrencyCost: number;
  specialRecipe: number;
  isEnchantment: boolean;
  price: number;
  priceTotal: number;
  displayInItemSets: boolean;
  iconPath: string;
}

export interface RawRuneData {
  id: number;
  name: string;
  majorChangePatchVersion: string;
  tooltip: string;
  shortDesc: string;
  longDesc: string;
  recommendationDescriptor: string;
  iconPath: string;
  endOfGameStatDescs: string[];
  recommendationDescriptorAttributes: Record<string, any>;
}

export interface RawSummonerSpellData {
  id: number;
  name: string;
  description: string;
  summonerLevel: number;
  cooldown: number;
  gameModes: string[];
  iconPath: string;
}

export interface Champion {
  icon: string;
  title: string;
  name: string;
  alias: string;
}

export interface Item {
  id: number;
  icon: string;
  name: string;
  description: string;
  price: number;
}

export interface Rune {
  icon: string;
  name: string;
  description: string;
  tree: string;
}

export interface SummonerSpell {
  icon: string;
  name: string;
  description: string;
  cooldown: number;
}

export interface MatchupData {
  champion: Champion;
  enemyChampion: string;
  difficulty: string;
  early: string;
  mid: string;
  late?: string;
  videos: string[];
  runes: Rune[];
  startItems: Item[];
  build: Item[];
  summonerSpells: string[];
}

export interface SummonerSpell {
  icon: string;
  name: string;
  description: string;
  cooldown: number;
}

export interface MatchupResponse {
  message: string;
  matchup: MatchupData;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Re-export from riotApi for convenience
export type { Champion as RiotChampion, Item as RiotItem, Rune as RiotRune, MatchupResponse as RiotMatchupResponse, ApiResponse as RiotApiResponse } from './riotApi';
