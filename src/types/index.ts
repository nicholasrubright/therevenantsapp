export type Character = {
  name: string;
  class_name: string;
  spec: string;
  image: string;
  item_level: number;
  region: string;
  realm: string;
};

export type Profile = {
  name: string;
  realm: string;
};

export type Config = {
  profiles: Profile[];
  min_item_level: number;
};
