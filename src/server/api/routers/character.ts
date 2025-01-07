import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Character } from "@/types";
import { RaiderIOClient } from "@/lib/api";

const RETRY_INTERVAL = 60 * 60 * 24;

export const characterRoute = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({ name: z.string(), region: z.string(), realm: z.string() }),
    )
    .query(async ({ input, ctx }) => {
      const dbCharacter = await ctx.db.character.findFirst({
        where: {
          name: input.name,
          realm: input.realm,
          region: input.region,
        },
      });

      if (!dbCharacter) {
        const result = await RaiderIOClient.GetCharacter(
          input.name,
          input.region,
          input.realm,
        );

        return await ctx.db.character.create({
          data: {
            name: result.name,
            class_name: result.class_name,
            spec: result.spec,
            image: result.image,
            item_level: result.item_level,

            realm: input.realm,
            region: input.region,
          },
        });

        return null;
      }

      const result = await RaiderIOClient.GetCharacter(
        input.name,
        input.region,
        input.realm,
      );

      return result;
    }),
});
