import { Alert, AlertTitle, AlertDescription } from "@/components/ui/shadcn/alert";
import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ErrorAlert({
  title = "Error",
  description = "Ocurrió un error. Por favor, intenta más tarde.",
  icon,
  className = "",
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className={`max-w-7xl mx-auto px-4 py-10 ${className}`}>
      {icon ?? <AlertCircle className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
