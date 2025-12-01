import { PageResponse } from "./Page";

export enum EstateType {
    RENT = "RENT",
    SALE = "SALE",
}

export enum EstateStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface EstateImage {
    id: number;
    url: string;
}

export interface EstateCharacteristic {
    id: number;
    name: string;
    value: string;
}

export interface EstateSeller {
    id: number;
    userId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    userProfilePicture: string | null;
    city: string;
    address: string;
    companyName: string;
    licenseNumber: string;
    bio: string;
    status: string;
    rating: number;
    verifiedAt: string | null;
    createdAt: string | null;
}

export type EstateCardType = {
    id: number;
    name: string;
    price: number;
    type: EstateType;
    city: string;
    address: string;
    mainImageUrl: string;
}

export interface EstateDetail {
    id: number;
    name: string;
    description: string;
    price: number;
    type: EstateType;
    status: EstateStatus | string;
    city: string;
    address: string;
    categoryId: number;
    categoryName: string;
    createdAt: string;
    updatedAt: string;

    seller: EstateSeller;
    images: EstateImage[];
    characteristics: EstateCharacteristic[];
}

export type EstateBasicResponse = {
    content: EstateCardType[];
    page: PageResponse;
}

export interface SearchEstatesParams {
    city?: string;
    type?: EstateType;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "ASC" | "DESC";
}