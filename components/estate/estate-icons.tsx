import { Building2, Car, Ruler, Calendar, CheckCircle2 } from "lucide-react";

export const getFeatureIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("baño")) return <Building2 className="w-4 h-4" />;
  if (n.includes("habita") || n.includes("dorm")) return <Building2 className="w-4 h-4" />;
  if (n.includes("auto") || n.includes("estaciona")) return <Car className="w-4 h-4" />;
  if (n.includes("constru") || n.includes("terreno")) return <Ruler className="w-4 h-4" />;
  if (n.includes("año")) return <Calendar className="w-4 h-4" />;
  return <CheckCircle2 className="w-4 h-4" />;
};