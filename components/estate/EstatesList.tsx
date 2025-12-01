"use client";

import { useEstatesByType } from "@/hooks/useEstates";
import { useState, useEffect } from "react";
import type { EstateCardType, SearchEstatesParams, EstateType } from "@/types/Estate";
import EstateCard from "@/components/estate/EstateCard";
import EstateFilters from "@/components/estate/EstateFilters";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { Badge } from "@/components/ui/shadcn/badge";
import { Home } from "lucide-react";
import { ErrorAlert } from "@/components/ui/common/error-alert";
import { EstateCardSkeletonList } from "@/components/estate/skeleton/EstateListSkeleton";
import { NoResults } from "@/components/ui/common/no-results";
import BottomPagination from "@/components/ui/common/bottom-pagination";

interface EstatesListProps {
    type: EstateType;
}

export default function EstatesList({ type }: EstatesListProps) {
    const [filters, setFilters] = useState<SearchEstatesParams>({
        page: 0,
        size: 12,
        sortBy: "createdAt",
        sortDir: "DESC",
    });
    
    const { data, isLoading, error } = useEstatesByType(type, filters);

    const estates = data?.content ?? [];
    const totalPages = data?.page.totalPages ?? 1;
    const totalElements = data?.page.totalElements ?? 0;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters.page]);

    const handlePageChange = (newPage: number) => {
        setFilters({ ...filters, page: newPage });
    };

    const handleFiltersChange = (newFilters: SearchEstatesParams) => {
        setFilters({ ...newFilters, type, page: 0 });
    };

    const onToggleFavorite = (estateId: number) => {
        console.log("Toggle favorite for estate ID:", estateId);
    };

    const title = type === "RENT" ? "Propiedades en Renta" : "Propiedades en Venta";
    const emptyTitle = type === "RENT" 
        ? "No hay propiedades en renta disponibles" 
        : "No hay propiedades en venta disponibles";

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-64 sm:w-72" />
                        <Skeleton className="h-6 w-40 sm:w-48" />
                    </div>
                </div>

                <EstateCardSkeletonList count={12} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <ErrorAlert
                    title="Error al cargar las propiedades"
                    description="Ocurrió un error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde."
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                        {title}
                    </h1>
                    <Badge variant="outline" className="font-normal text-sm w-fit">
                        {totalElements > 0 ? (
                            <>
                                <span>Página {(filters.page ?? 0) + 1} de {totalPages}</span>
                                <span className="mx-1">•</span>
                                <span>{totalElements} {totalElements === 1 ? "propiedad" : "propiedades"}</span>
                            </>
                        ) : (
                            <span>0 propiedades</span>
                        )}
                    </Badge>
                </div>
                
                <div className="mt-4 sm:mt-0">
                    <EstateFilters filters={filters} onFiltersChange={handleFiltersChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {estates.length > 0 ? (
                    estates.map((estate: EstateCardType) => (
                        <EstateCard
                            key={estate.id}
                            estate={estate}
                            isFavorite={false}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))
                ) : (
                    <NoResults
                        title={emptyTitle}
                        description="Por favor, vuelve más tarde o ajusta tus filtros."
                        icon={Home}
                    />
                )}
            </div>

            <div className="flex justify-center sm:justify-end sm:ml-auto mt-12">
                <BottomPagination
                    currentPage={filters.page ?? 0}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
