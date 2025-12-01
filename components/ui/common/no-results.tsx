import { LucideIcon } from "lucide-react";

interface NoResultsProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export function NoResults({
  title = "No se encontraron resultados",
  description = "Intenta ajustar tus filtros",
  icon: Icon,
}: NoResultsProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
      {Icon && <Icon className="w-16 h-16 mb-4 text-gray-300" />}
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
}
