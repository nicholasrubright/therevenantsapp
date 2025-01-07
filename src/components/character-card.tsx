import { Character } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import config from "@/static/config.json";
import type { Config } from "@/types";
import clsx from "clsx";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const appConfig: Config = config;

  return (
    <Card className="w-full max-w-md transition-colors hover:bg-muted/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={character.image} alt={character.name} />
              <AvatarFallback>{character.name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold">{character.name}</h3>
              <p className="text-sm">
                {character.class_name} - {character.spec}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm">Item Level</span>
            <span
              className={clsx(
                "text-lg font-bold",
                appConfig.min_item_level > character.item_level
                  ? "text-destructive"
                  : "text-green-600",
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
