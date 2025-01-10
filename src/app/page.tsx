import { api, HydrateClient } from "@/trpc/server";
import CharacterCard from "@/components/character-card";
import type { Character, Config, Profile } from "@/types";
import config from "@/static/config.json";

const getData = async (profiles: Profile[]): Promise<Character[]> => {
  const profileData = profiles.map((p) => {
    return {
      name: p.name,
      region: "US",
      realm: p.realm,
    };
  });

  const players = await api.character.get(profileData);

  return players.sort((a, b) => b.item_level - a.item_level);
};

// const getLastUpdated = async () => {
//   const data = await api.character.lastUpdated();

//   return data?.lastUpdated;
// };

export default async function Home() {
  const appConfig: Config = config;

  const characters = await getData(appConfig.profiles);

  // const lastUpdated = await getLastUpdated();

  return (
    <HydrateClient>
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-4xl px-4">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold">The Revenants</h1>
            <p className="mt-2">Track the Raider&apos;s item levels</p>
            <p>Required item level: {appConfig.min_item_level}</p>
            {/* <div className="flex flex-row items-center justify-center gap-5 text-muted">
        
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
