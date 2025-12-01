import { Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import { EstateSeller } from "@/types/Estate";

interface SellerProps {
    seller: EstateSeller;
}

export function SellerCard({ seller }: SellerProps) {
    return (
        <Card className="border-l-4 border-l-primary shadow-sm sticky top-8">
            <CardHeader>
                <CardTitle className="text-lg">Información del Vendedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={seller.userProfilePicture || ""} />
                        <AvatarFallback>{seller.userName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{seller.userName}</p>
                        <p className="text-xs text-muted-foreground">{seller.companyName}</p>
                    </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="truncate">{seller.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{seller.userPhone}</span>
                    </div>
                </div>
                <Button variant="secondary" className="w-full text-xs">
                    Ver inventario de {seller.userName.split(' ')[0]}
                </Button>
            </CardContent>
        </Card>
    );
}