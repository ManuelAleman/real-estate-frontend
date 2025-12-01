"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/shadcn/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/shadcn/scroll-area";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/shadcn/carousel";
import { EstateImage, EstateType } from "@/types/Estate";


interface EstateGalleryProps {
    images: EstateImage[];
    type: EstateType; 
}

export function EstateGallery({ images, type }: EstateGalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const onThumbClick = useCallback((index: number) => {
        if (api) api.scrollTo(index);
    }, [api]);

    return (
        <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border bg-muted group">
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {images?.map((img) => (
                            <CarouselItem key={img.id} className="relative aspect-video w-full">
                                <Image
                                    src={img.url}
                                    alt="Estate"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CarouselPrevious className="static translate-y-0 h-10 w-10 border-none bg-black/50 text-white hover:bg-black/70" />
                        <CarouselNext className="static translate-y-0 h-10 w-10 border-none bg-black/50 text-white hover:bg-black/70" />
                    </div>
                </Carousel>
                <Badge className="absolute top-4 left-4 bg-black/60 hover:bg-black/70 border-none text-white backdrop-blur-md">
                    {type === 'SALE' ? 'En Venta' : 'En Renta'}
                </Badge>
            </div>

            <ScrollArea className="w-full whitespace-nowrap rounded-md border p-1">
                <div className="flex w-max space-x-2 p-1">
                    {images?.map((img, index) => (
                        <button
                            key={img.id}
                            onClick={() => onThumbClick(index)}
                            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-md transition-all ${current === index ? "ring-2 ring-primary ring-offset-1 opacity-100" : "opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image src={img.url} alt="thumbnail" fill className="object-cover" />
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}