import { EstateCardSkeleton } from "./EstateCardSkeleton";

interface Props {
  count?: number;
}

export function EstateCardSkeletonList({ count = 12 }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(count)].map((_, i) => (
        <EstateCardSkeleton key={i} />
      ))}
    </div>
  );
}
