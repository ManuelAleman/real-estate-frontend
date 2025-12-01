"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/shadcn/sheet";
import { SearchEstatesParams } from "@/types/Estate";
import { SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";

interface EstateFiltersProps {
  filters: SearchEstatesParams;
  onFiltersChange: (filters: SearchEstatesParams) => void;
}

export default function EstateFilters({ filters, onFiltersChange }: EstateFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchEstatesParams>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchEstatesParams = {
      page: filters.page,
      size: filters.size,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.keys(filters).filter(
    (key) =>
      !["page", "size", "sortBy", "sortDir", "type"].includes(key) &&
      filters[key as keyof SearchEstatesParams]
  ).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative rounded-xl border-gray-300 hover:bg-gray-100">
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-1 px-1.5 py-0 text-[10px] rounded-full">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto px-5 py-6 bg-gray-50 flex flex-col">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-xl font-semibold">Filtrar Propiedades</SheetTitle>
          <SheetDescription className="text-gray-600">
            Refina tu búsqueda usando los filtros disponibles
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 flex-1 pb-12">

          <div className="bg-white shadow-sm rounded-xl p-4 space-y-4 border border-gray-200">
            <div className="space-y-1.5">
              <Label htmlFor="city" className="font-medium">Ciudad</Label>
              <Input
                id="city"
                className="rounded-lg"
                placeholder="Ej: Ciudad de México"
                value={localFilters.city ?? ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    city: e.target.value || undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-4 space-y-3 border border-gray-200">
            <Label className="font-medium">Rango de precio (MXN)</Label>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="minPrice" className="text-sm text-gray-600">Mínimo</Label>
                <Input
                  id="minPrice"
                  type="number"
                  className="rounded-lg"
                  placeholder="0"
                  value={localFilters.minPrice ?? ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maxPrice" className="text-sm text-gray-600">Máximo</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  className="rounded-lg"
                  placeholder="Sin límite"
                  value={localFilters.maxPrice ?? ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      maxPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-4 space-y-4 border border-gray-200">
            <div className="space-y-1.5">
              <Label htmlFor="sortBy" className="font-medium">Ordenar por</Label>
              <Select
                value={localFilters.sortBy ?? "createdAt"}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, sortBy: value })
                }
              >
                <SelectTrigger id="sortBy" className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Fecha de creación</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sortDir" className="font-medium">Dirección</Label>
              <Select
                value={localFilters.sortDir ?? "DESC"}
                onValueChange={(value) =>
                  setLocalFilters({
                    ...localFilters,
                    sortDir: value as "ASC" | "DESC",
                  })
                }
              >
                <SelectTrigger id="sortDir" className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DESC">Descendente</SelectItem>
                  <SelectItem value="ASC">Ascendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <SheetFooter className="sticky bottom-0 left-0 bg-white p-4 border-t flex gap-2">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1 rounded-xl"
          >
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>

          <Button onClick={handleApplyFilters} className="flex-1 rounded-xl">
            Aplicar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}