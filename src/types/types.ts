export interface NavBarLatProps {
    img : string;
    firstName: string;
    lastName: string;
    className : string;
    toggle : () => void;
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

export interface CompanyData {
    name: string;
    tva: string;
    country: string;
    type: string;
}

export interface ContactData{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
}

export interface ContactForm{
    name: string;
    companyId: string;
    email: string;
    phoneNr: string;
}

export interface HamburgerProps {
    className : string;
    toggle : () => void;
}

export interface StatsDashboard {
    totalInvoices:number;
    totalCompanies:number;
    totalContacts:number;
}