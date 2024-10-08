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
    sortedResults: Invoice[];
};

export type InvoicesLatest = {
    invoices: Invoice[];
}