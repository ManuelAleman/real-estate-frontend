"use client";

import { use } from "react";
import { useEstateById } from "@/hooks/useEstates";
import { MapPin, Share2, Heart } from "lucide-react";

import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Separator } from "@/components/ui/shadcn/separator";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

import { EstateGallery } from "@/components/estate/detail/EstateGallery";
import { SellerCard } from "@/components/estate/detail/SellerCard";
import { formatPrice } from "@/lib/utils";
import { getFeatureIcon } from "@/components/estate/estate-icons";

export default function Page({ params }: { params: Promise<{ type: string; id: string }> }) {
    const { id: estateId } = use(params);
    const { data, isLoading, error } = useEstateById(Number(estateId));

    if (isLoading) return <div className="container mx-auto p-10"><Skeleton className="w-full h-96" /></div>;
    if (error || !data) return <div className="p-10 text-center text-red-500">Error al cargar</div>;

    return (
        <div className="min-h-screen bg-background pb-10">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 text-sm text-muted-foreground">
                <span className="font-medium">
                    Inmuebles / {data.city} / {data.categoryName}
                </span>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="ghost" size="sm" className="h-8 px-2 flex-1 md:flex-none justify-center md:justify-start">
                        <Share2 className="w-4 h-4 mr-2" /> Compartir
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 flex-1 md:flex-none justify-center md:justify-start">
                        <Heart className="w-4 h-4 mr-2" /> Guardar
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <EstateGallery images={data.images} type={data.type} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">{data.name}</h1>
                            <div className="flex items-center text-muted-foreground mb-4">
                                <MapPin className="w-4 h-4 mr-1 shrink-0" />
                                <span className="text-sm line-clamp-1">{data.address}</span>
                            </div>
                            <Badge variant="secondary" className="px-3 py-1 text-sm font-normal mb-6">
                                {data.categoryName}
                            </Badge>

                            <div className="mb-6">
                                <p className="text-sm text-muted-foreground mb-1">Precio total</p>
                                <div className="text-4xl font-bold text-primary tracking-tight">
                                    {formatPrice(data.price)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button size="lg" className="w-full font-bold">Contactar</Button>
                                <Button size="lg" variant="outline" className="w-full">Visitar</Button>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg border grid grid-cols-3 gap-4 text-center">
                            {data.characteristics.slice(0, 3).map((char: any) => (
                                <div key={char.id} className="space-y-1">
                                    <div className="flex justify-center text-primary/80">{getFeatureIcon(char.name)}</div>
                                    <div className="font-semibold text-sm">{char.value}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">{char.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-xl font-semibold mb-4">Lo que ofrece este lugar</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                                {data.characteristics.map((char: any) => (
                                    <div key={char.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                                        <div className="text-muted-foreground">
                                            {getFeatureIcon(char.name)}
                                        </div>
                                        <span className="text-sm text-foreground">{char.name}: <span className="font-medium">{char.value}</span></span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-3">Descripción</h3>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                                {data.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                            <div className="w-full h-[300px] bg-muted rounded-xl flex items-center justify-center border relative overflow-hidden">
                                <div className="text-center text-muted-foreground opacity-50">
                                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                                    <span>Mapa Interactivo</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <SellerCard seller={data.seller} />
                    </div>
                </div>
            </div>
        </div>
    );
}