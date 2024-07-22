export interface InvoiceCompany {
    _id: string;
    reference: string;
    companyId: Company | null;
    createdAt: string;
    updatedOn: string;
    __v: number;
    dueDate: string;
}

interface Company {
    _id: string;
    name: string;
}

export interface InvoicesListCompany {
    invoices: InvoiceCompany[];
}
