import { api, HydrateClient } from "@/trpc/server";
import CharacterCard from "@/components/character-card";
import type { Character, Config, Profile } from "@/types";
import config from "@/static/config.json";

const getData = async (profiles: Profile[]): Promise<Character[]> => {
  const characterPromises = profiles.map((char) => {
    return api.character.get({
      name: char.name,
      region: "US",
      realm: char.realm.toLowerCase(),
    });
  });

  const characterData = (await Promise.allSettled(characterPromises))
    .filter((i) => i.status === "fulfilled")
    .map((i) => i.value!);

  return characterData;
};

export default async function Home() {
  const appConfig: Config = config;

  const characters = await getData(appConfig.profiles);

  return (
    <HydrateClient>
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-4xl px-4">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold">The Revenants</h1>
            <p className="mt-2">Track the Raider&apos;s item levels</p>
            <p>Required item level: {appConfig.min_item_level}</p>
            {/* <div className="flex flex-row items-center justify-center gap-5">
              <p>Updated as of {new Date().toDateString()}</p>
            </div> */}
          </header>

          <div className="flex flex-col items-center space-y-4">
            {characters.map((char, index) => (
              <CharacterCard key={`${char.name}_${index}`} character={char} />
            ))}
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
