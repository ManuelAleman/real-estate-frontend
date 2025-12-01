"use client";

import EstatesList from "@/components/estate/EstatesList";
import { EstateType } from "@/types/Estate";
import { notFound } from "next/navigation";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ type: string }> }) {
    const { type: typeParam } = use(params);
    const validTypes = ["rent", "sale"];
    
    if (!validTypes.includes(typeParam)) {
        notFound();
    }

    const type: EstateType = typeParam === "rent" ? EstateType.RENT : EstateType.SALE;

    return <EstatesList type={type} />;
}
