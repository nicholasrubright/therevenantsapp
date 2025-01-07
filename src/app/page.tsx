import { api, HydrateClient } from "@/trpc/server";
import CharacterCard from "@/components/character-card";
import type { Character } from "@/types";
import characters from "@/static/characters.json";
import { Suspense } from "react";
import SkeletonCard from "@/components/skeleton-card";

const getData = async (): Promise<Character[]> => {
  const characterPromises = characters.map((char) => {
    return api.character.get({
      name: char,
      region: "US",
      realm: "dalaran",
    });
  });

  const characterData = (await Promise.allSettled(characterPromises))
    .filter((i) => i.status === "fulfilled")
    .map((i) => i.value!);

  return characterData;
};

export default async function Home() {
  const characters = await getData();

  return (
    <HydrateClient>
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-4xl px-4">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold">The Revenants</h1>
            <p className="mt-2">Track the Raider&apos;s item levels</p>
          </header>

          <div className="flex flex-col items-center space-y-4">
            {characters.map((char, index) => (
              <Suspense key={char.name} fallback={<SkeletonCard />}>
                <CharacterCard key={`${char.name}_${index}`} character={char} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
