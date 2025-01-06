import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CharacterResponse } from "@/types/api";
import { Character } from "@/types";

export const characterRoute = createTRPCRouter({
  getCharacter: publicProcedure
    .input(
      z.object({ name: z.string(), region: z.string(), realm: z.string() }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `https://raider.io/api/v1/characters/profile?region=${input.region}&realm=${input.realm}&name=${input.name}&fields=gear`,
      );

      const data: CharacterResponse =
        (await response.json()) as CharacterResponse;

      const result: Character[] = data;

      return [];
    }),
});
