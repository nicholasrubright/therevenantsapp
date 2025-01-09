import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Character } from "@/types";
import { RaiderIOClient } from "@/lib/api";

const RETRY_INTERVAL = 60 * 60 * 1000;

const needsUpdated = (lastUpdate: Date): boolean => {
  const now = new Date();

  const timeSinceLastUpdate = now.getTime() - lastUpdate.getTime();
  return timeSinceLastUpdate > RETRY_INTERVAL;
};

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

      if (
        !dbCharacter ||
        (dbCharacter && needsUpdated(dbCharacter.lastUpdated))
      ) {
        const result = await RaiderIOClient.GetCharacter(
          input.name,
          input.region,
          input.realm,
        );

        if (!result) {
          return null;
        }

        return await ctx.db.character.upsert({
          create: {
            name: result.name,
            class_name: result.class_name,
            spec: result.spec,
            image: result.image,
            item_level: result.item_level,

            realm: input.realm,
            region: input.region,
          },
          update: {
            item_level: result.item_level,
            spec: result.spec,
            class_name: result.class_name,
            image: result.image,
            lastUpdated: new Date(),
          },
          where: {
            name: input.name,
            region: input.region,
            realm: input.realm,
          },
        });
      }

      return dbCharacter;
    }),

  lastUpdated: publicProcedure.query(async ({ ctx }) => {
    const lastUpdated = await ctx.db.character.findMany({
      select: {
        lastUpdated: true,
      },
      orderBy: {
        lastUpdated: "desc",
      },
      take: 1,
    });

    return lastUpdated[0] ?? null;
  }),
});
