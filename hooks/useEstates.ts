import { useQuery } from "@tanstack/react-query";
import type { EstateBasicResponse, SearchEstatesParams, EstateType } from "@/types/Estate";
import { REACT_QUERY_KEYS } from "@/lib/constants";
import { getEstateById, getEstatesByType } from "@/services/estate.service";

export function useEstatesByType(
  type: EstateType,
  params: SearchEstatesParams = {}
) {
  return useQuery<EstateBasicResponse>({
    queryKey: [REACT_QUERY_KEYS.ESTATE, type, params],
    queryFn: () => getEstatesByType(type, params),
  });
}

export function useEstateById(estateId: number) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.ESTATE, estateId],
    queryFn: () => getEstateById(estateId),
  });
}