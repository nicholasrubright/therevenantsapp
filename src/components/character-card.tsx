import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

interface CharacterCardProps {
  name: string;
  class_name: string;
  spec: string;
  thumbnail_url: string;
  item_level: number;
}

export default function CharacterCard({
  name,
  class_name,
  spec,
  thumbnail_url,
  item_level,
}: CharacterCardProps) {
  return (
    <Card className="w-full max-w-md transition-colors hover:bg-gray-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={thumbnail_url} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">
                {class_name} - {spec}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Item Level</span>
            <span className="text-lg font-bold text-gray-900">
              {item_level}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
