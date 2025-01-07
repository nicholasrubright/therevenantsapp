import { api, HydrateClient } from "@/trpc/server";
import CharacterCard from "@/components/character-card";
import { Character } from "@/types";

const getData = async (): Promise<Character> => {
  const character = await api.character.get({
    name: "Koalth",
    region: "US",
    realm: "dalaran",
  });

  return character;
};

export default async function Home() {
  // const data = [
  //   {
  //     name: "Koalth",
  //     class_name: "Mage",
  //     spec: "Arcane",
  //     thumbnail_url:
  //       "https://render.worldofwarcraft.com/us/character/dalaran/123/227963515-avatar.jpg?alt=/wow/static/images/2d/avatar/1-0.jpg",
  //     item_level: 639,
  //   },
  //   {
  //     name: "Koalth",
  //     class_name: "Mage",
  //     spec: "Arcane",
  //     thumbnail_url:
  //       "https://render.worldofwarcraft.com/us/character/dalaran/123/227963515-avatar.jpg?alt=/wow/static/images/2d/avatar/1-0.jpg",
  //     item_level: 639,
  //   },
  //   {
  //     name: "Koalth",
  //     class_name: "Mage",
  //     spec: "Arcane",
  //     thumbnail_url:
  //       "https://render.worldofwarcraft.com/us/character/dalaran/123/227963515-avatar.jpg?alt=/wow/static/images/2d/avatar/1-0.jpg",
  //     item_level: 639,
  //   },
  // ];

  const character = await getData();

  return (
    <HydrateClient>
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-4xl px-4">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold">The Revenants</h1>
            <p className="mt-2">Track the Raider&apos;s item levels</p>
          </header>

          <div className="flex flex-col items-center space-y-4">
            <CharacterCard character={character} />
            {/* {data.map((char, index) => (
              <CharacterCard
                key={index}
                name={char.name}
                item_level={char.item_level}
                thumbnail_url={char.thumbnail_url}
                spec={char.spec}
                class_name={char.class_name}
              />
            ))} */}
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
