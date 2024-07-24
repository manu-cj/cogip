import { useState, useEffect } from "react";
import { Contact, Contacts, ContactsLatest } from "../types/contactsType";
import { StatsDashboard } from "../types/types";
import { Invoice, Invoices, InvoicesLatest } from "../types/invoicesType";
import { Company, Companies, CompaniesLatest } from "../types/companiesType";
import { ContactCompany, ContactsList } from "../types/contactCompany";
import { InvoiceCompany, InvoicesListCompany } from "../types/invoicesCompany";
function getResponseType(URL: string): 'contact' | 'contacts'| 'stats' | 'invoices'| 'companies'| 'company'| 'contactCompany'| 'invoicesCompany'|'contactLastest'| 'invoicesLatest'| 'companiesLatest' {
  if (/\/api\/contacts\/[a-f0-9]+$/.test(URL)) {
      return 'contact';
  } else if (/\/contacts\/pagination\/\d+\/\d+\/?(\?.*)?$/.test(URL)) {
      return 'contacts';
  } else if (/\/api\/stats$/.test(URL)){
    return 'stats';
  } else if (/\/api\/invoices\/pagination\/\d+\/\d+\/?(\?.*)?$/.test(URL)) {
    return 'invoices';
  } else if (/\/api\/companies\/pagination\/\d+\/\d+\/?(\?.*)?$/.test(URL)) {
    return 'companies';
  } else if (/\/api\/companies\/[a-f0-9]+$/.test(URL)){
    return 'company';
  } else if(/\/api\/contacts\/company\/[a-f0-9]+$/.test(URL)){
    return 'contactCompany'
  } else if(/\/api\/invoices\/company\/[a-f0-9]+$/.test(URL)){
    return 'invoicesCompany'
  } else if(/\/api\/contacts\/latest$/.test(URL)){
    return 'contactLastest'
  } else if(/\/api\/invoices\/latest$/.test(URL)){
    return 'invoicesLatest'
  } else if(/\/api\/companies\/latest$/.test(URL)){
    return 'companiesLatest'
  }
  else {
    throw new Error("Invalid URL format");
  }
}
export default function useAPI(URL : string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [nbrPageContact, setNbrPageContact] = useState<number>(0);
  const [stats, setStats] = useState<StatsDashboard>({} as StatsDashboard);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [nbrPageInvoice, setNbrPageInvoice] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company>({} as Company);
  const [nbrPageCompanies, setNbrPageCompanies] = useState<number>(0);
  const [contactCompany, setContactCompany] = useState<ContactCompany[]>([]);
  const [invoiceCompany, setInvoiceCompany] = useState<InvoiceCompany[]>([]);
  const [contactLatest, setContactLatest] = useState<Contact[]>([]);
  const [invoiceLatest, setInvoiceLatest] = useState<Invoice[]>([]);
  const [companiesLatest, setCompaniesLatest] = useState<Company[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(
                URL,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const responseType = getResponseType(URL);
                if (responseType === 'contact') {
                    const data: Contact = await response.json();
                    setContact(data);
                } else if (responseType === 'contacts') {
                    const data: Contacts = await response.json();
                    setContacts(data.pageResults);
                    setNbrPageContact(data.totalPages)
                } else if (responseType === 'stats'){
                  const data: StatsDashboard = await response.json();
                  setStats(data);
                } else if (responseType === 'invoices') {
                  const data: Invoices = await response.json();
                  setInvoices(data.sortedResults);
                  setNbrPageInvoice(data.totalPages)
                } else if (responseType ==="companies") {
                  const data: Companies = await response.json();
                  setCompanies(data.pageResults);
                  setNbrPageCompanies(data.totalPages)
                } else if(responseType === "company") {
                  const data: Company = await response.json();
                  setCompany(data);
                } else if(responseType === "contactCompany") {
                  const data: ContactsList = await response.json();
                  setContactCompany(data.contacts);
                } else if(responseType === "invoicesCompany") {
                  const data: InvoicesListCompany = await response.json();
                  setInvoiceCompany(data.invoices);
                } else if(responseType==='contactLastest'){
                  const data: ContactsLatest = await response.json();
                  setContactLatest(data.contacts);
                } else if(responseType==='invoicesLatest'){
                  const data: InvoicesLatest = await response.json();
                  setInvoiceLatest(data.invoices);
                } else if(responseType==='companiesLatest'){
                  const data: CompaniesLatest = await response.json();
                  setCompaniesLatest(data.companies);
                }
              setLoading(false);
              
            } catch (error : any) {
              console.log(error.message);
              setError(error.message);
              setLoading(false);
            }
          };
      
          fetchData();
        }, [URL]);
    return { loading, error, contacts, contact, nbrPageContact, stats, invoices, nbrPageInvoice, companies, nbrPageCompanies, company, contactCompany, invoiceCompany, contactLatest, invoiceLatest, companiesLatest };
}