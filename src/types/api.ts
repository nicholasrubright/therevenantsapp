export type CharacterRequest = {
  region: string;
  realm: string;
  name: string;
};

export type CharacterResponse = {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  gear: GearResponse;
};

export type GearResponse = {
  updated_at: string;
  item_level_equipped: number;
  item_level_total: number;
};
