import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

export function EstateCardSkeleton() {
    return (
        <Card className="w-full rounded-2xl overflow-hidden shadow-sm py-0">
            <div className="relative h-48 w-full">
                <Skeleton className="h-full w-full rounded-none" />
                <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />
            </div>

            <CardContent className="px-5 py-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between mt-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}
