import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import type { EstateCardType } from "@/types/Estate";

interface EstateCardProps {
    estate: EstateCardType;
    isFavorite: boolean;
    onToggleFavorite: (estateId: number) => void;
}

export default function EstateCard({
    estate,
    isFavorite,
    onToggleFavorite,
}: EstateCardProps) {
    return (
        <Link href={`/estates/${estate.type.toLowerCase()}/${estate.id}`} className="block">
            <Card className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 py-0 cursor-pointer">
                <CardContent className="relative h-48">
                    <Image
                        src={estate.mainImageUrl}
                        alt={estate.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-t-2xl"
                        loading="eager"
                    />

                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleFavorite(estate.id);
                        }}
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white opacity-70 shadow-sm hover:scale-110 transition-all"
                    >
                        <Heart
                            className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"}`}
                        />
                    </Button>
                </CardContent>

                <div className="flex flex-col justify-between h-40 pb-4">
                    <CardHeader className="px-5">
                        <CardTitle className="text-xl font-semibold line-clamp-2">
                            {estate.name}
                        </CardTitle>
                        <CardDescription className="flex items-start text-gray-500 mt-1 leading-tight">
                            <MapPin className="w-4 h-4 mr-1 mt-0.5" />
                            {estate.address}, {estate.city}
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="px-5 flex items-center justify-between">
                        <span className="text-xl font-bold">
                            ${estate.price.toLocaleString()} MXN
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                            {estate.type.toUpperCase()}
                        </span>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
}
