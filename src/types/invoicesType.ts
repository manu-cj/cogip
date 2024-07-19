type Company = {
    _id: string;
    name: string;
};

export type Invoice = {
    _id: string;
    reference: string;
    companyId: Company;
    createdAt: string;
    updatedOn: string;
    dueDate: string;
    __v: number;
};

export type Invoices = {
    totalResults: number;
    totalPages: number;
    pageResults: Invoice[];
};