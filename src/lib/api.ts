import type { Character } from "@/types";
import { buildUrl } from "build-url-ts";
import { z } from "zod";

const gearResponseSchema = z.object({
  updated_at: z.string(),
  item_level_equipped: z.number(),
  item_level_total: z.number(),
});

const characterResponseSchema = z.object({
  name: z.string(),
  race: z.string(),
  class: z.string(),
  active_spec_name: z.string(),
  active_spec_role: z.string(),
  gender: z.string(),
  faction: z.string(),
  achievement_points: z.number(),
  thumbnail_url: z.string(),
  region: z.string(),
  realm: z.string(),
  last_crawled_at: z.string(),
  profile_url: z.string(),
  profile_banner: z.string(),
  gear: gearResponseSchema,
});

async function GetCharacter(
  name: string,
  region: string,
  realm: string,
): Promise<Character | null> {
  const requestUrl = buildUrl("https://raider.io", {
    path: "api/v1/characters/profile",
    queryParams: {
      name,
      region,
      realm,
      fields: ["gear"],
    },
  });

  const response = await fetch(requestUrl);

  if (!response.ok) {
    console.error("Response was not okay");
    return null;
  }

  const result = characterResponseSchema.safeParse(await response.json());

  if (!result.success) {
    console.error("Error: ", result.error);
    return null;
  }

  return {
    name: result.data.name,
    class_name: result.data.class,
    spec: result.data.active_spec_name,
    image: result.data.thumbnail_url,
    item_level: result.data.gear.item_level_equipped,
  };
}

export const RaiderIOClient = { GetCharacter };