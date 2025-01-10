import type { Character } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import config from "@/static/config.json";
import type { Config } from "@/types";
import clsx from "clsx";
import { formatTimeAgo } from "@/lib/utils";

interface CharacterCardProps {
  character: Character;
  meetsRequirements: boolean;
}

export default function CharacterCard({
  character,
  meetsRequirements,
}: CharacterCardProps) {
  const dataFromTimeAgo = formatTimeAgo(character.last_crawled);

  return (
    <Card className="w-full max-w-md cursor-default transition-colors hover:bg-muted/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={character.image} alt={character.name} />
              <AvatarFallback>{character.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{character.name}</h3>
              <p className="text-sm">
                {character.class_name} - {character.spec}
              </p>

              <p className="text-xs text-gray-500">
                Data from {dataFromTimeAgo}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm">Item Level</span>
            <span
              className={clsx(
                "text-lg font-bold",
                !meetsRequirements ? "text-red-400" : "text-green-400",
              )}
            >
              {character.item_level}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
