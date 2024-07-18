export type Company = {
    _id: string;
    name: string;
    vat: string;
    country: string;
    type: 'supplier' | 'client';
    createdAt: string;
    updatedOn: string;
    __v: number;
}

export type Companies = {
    totalResults: number;
    totalPages: number;
    pageResults: Company[];
}