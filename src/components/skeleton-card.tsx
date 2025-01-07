import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="mb-2 w-full max-w-md border-slate-800 bg-slate-950">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Avatar Skeleton */}
          <Skeleton className="h-12 w-12 rounded-full" />

          {/* Info Skeleton */}
          <div className="flex-grow">
            <Skeleton className="mb-2 h-6 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Item Level Skeleton */}
          <div className="flex flex-col items-end">
            <Skeleton className="mb-1 h-4 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
