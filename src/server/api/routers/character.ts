import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { Character } from "@/types";
import { RaiderIOClient } from "@/lib/api";
import pLimit from "p-limit";
import { TRPCError } from "@trpc/server";

const RETRY_INTERVAL = 60 * 60 * 1000;

const RATE_LIMIT = 2;
const limit = pLimit(RATE_LIMIT);

const needsUpdated = (lastUpdate: Date): boolean => {
  const now = new Date();

  const timeSinceLastUpdate = now.getTime() - lastUpdate.getTime();
  return timeSinceLastUpdate > RETRY_INTERVAL;
};

const getInputSchema = z.array(
  z.object({
    name: z.string(),
    region: z.string(),
    realm: z.string(),
  }),
);

export const characterRoute = createTRPCRouter({
  get: publicProcedure.input(getInputSchema).query(async ({ input, ctx }) => {
    try {
      const existingPlayers = await ctx.db.character.findMany({
        where: {
          name: {
            in: input.map((i) => i.name),
          },
        },
      });

      const existingPlayerNames = new Set(existingPlayers.map((p) => p.name));
      const missingPlayers = input.filter(
        (p) => !existingPlayerNames.has(p.name),
      );

      if (missingPlayers.length === 0) {
        return existingPlayers;
      }

      const fetchPromises = missingPlayers.map((player) =>
        limit(() =>
          RaiderIOClient.GetCharacter(player.name, player.region, player.realm),
        ),
      );

      const newPlayers = await Promise.allSettled(fetchPromises);

      const fetchedPlayers: Character[] = newPlayers
        .filter(
          (result): result is PromiseFulfilledResult<Character> =>
            result.status === "fulfilled",
        )
        .map((result) => ({
          name: result.value.name,
          class_name: result.value.class_name,
          spec: result.value.spec,
          image: result.value.image,
          item_level: result.value.item_level,
          region: result.value.region,
          realm: result.value.realm,
          last_crawled: result.value.last_crawled,
        }));

      let newlyAddedPlayers: Character[] = [];
      if (fetchedPlayers.length > 0) {
        newlyAddedPlayers = await ctx.db.character
          .createMany({
            data: fetchedPlayers,
            skipDuplicates: true,
          })
          .then(() =>
            ctx.db.character.findMany({
              where: {
                name: {
                  in: fetchedPlayers.map((p) => p.name),
                },
              },
            }),
          );
      }

      const failedPlayers = newPlayers
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === "rejected",
        )
        .map((result) => result.reason as string);

      if (failedPlayers.length > 0) {
        console.error("Failed to fetched some players: ", failedPlayers);
      }

      return [...existingPlayers, ...newlyAddedPlayers];
    } catch (err) {
      console.error(`Error in get: `, err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve player data",
      });
    }
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

    return lastUpdated[0];
  }),
});
