import { Skeleton } from "@/components/ui/skeleton";

export function BookCardSkeleton() {
  return (
    <div className="bg-card rounded-[12px] p-4 shadow-card">
      <Skeleton className="aspect-[3/4] mb-4 rounded-[8px]" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}
