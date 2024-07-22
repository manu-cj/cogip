export type Company = {
    _id: string;
    name: string;
    vat: string;
    country: string;
    typeId: TypeId;
    createdAt: string;
    updatedOn: string;
    __v: number;
}

export type Companies = {
    totalResults: number;
    totalPages: number;
    pageResults: Company[];
}

type TypeId = {
    _id: string;
    name: string;
}

export type CompaniesLatest = {
    companies: Company[];
  }