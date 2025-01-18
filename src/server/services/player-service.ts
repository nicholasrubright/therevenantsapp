import type { Character } from "@/types";
import { type PrismaClient } from "@prisma/client";
import { z } from "zod";
import { RaiderIOClient } from "@/lib/api";

const playerInputSchema = z.object({
  name: z.string(),
  realm: z.string(),
  region: z.string(),
});

const playersInputSchema = z.array(playerInputSchema);

type playerInput = z.infer<typeof playerInputSchema>;
type playersInput = z.infer<typeof playersInputSchema>;

export class PlayerService {
  constructor(private db: PrismaClient) {}

  async getExistingPlayers(input: playersInput): Promise<Character[]> {
    return await this.db.character.findMany({
      where: {
        name: {
          in: input.map((i) => i.name),
        },
      },
    });
  }

  async fetchPlayers(input: playerInput): Promise<Character | null> {
    return await RaiderIOClient.GetCharacter(
      input.name,
      input.region,
      input.realm,
    );
  }
}
