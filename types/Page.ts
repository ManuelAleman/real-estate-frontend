export type PageResponse = {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export type PageParameters = {
    page?: number;
    size?: number;
}