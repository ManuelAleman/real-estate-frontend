import { api } from "@/lib/api";
import { SearchEstatesParams, EstateType } from "@/types/Estate";

export async function getEstatesByType(type: EstateType, params: SearchEstatesParams = {}) {
    const endpoint = type === EstateType.RENT 
        ? "/estates/public/rent" 
        : "/estates/public/sale";
    
    const response = await api.get(endpoint, {
        params: {
            page: params.page ?? 0,
            size: params.size ?? 10,
            city: params.city,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            categoryId: params.categoryId,
            sortBy: params.sortBy ?? "createdAt",
            sortDir: params.sortDir ?? "DESC",
        },
    });
    return response.data;
}

export async function getEstateById(estateId: number) {
    const response = await api.get(`/estates/public/${estateId}`);
    return response.data;
}