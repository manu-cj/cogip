export interface NavBarLatProps {
    img : string;
    firstName: string;
    lastName: string;
}

interface Invoice {
    number: string;
    date: string;
    company: string;
}

export interface LastInvoiceProps {
    invoice: Invoice[];
}

export interface LastContactProps {
    contact: Contact[];
}

interface Contact {
    name: string;
    email: string;
    phone: string;
}

interface Company {
    name: string;
    tva: string;
    country: string;
}

export interface LastCompaniesProps {
    companies: Company[];
}

export interface InvoiceData {
    reference: string;
    price: string;
    company: string;
}