import { useState, useEffect } from "react";
import { Contact, Contacts } from "../types/contactsType"; // A adapter
import { StatsDashboard } from "../types/types";
import { Invoice, Invoices } from "../types/invoicesType";
import { Company, Companies } from "../types/companiesType";

function getResponseType(URL: string): 'contact' | 'contacts'| 'stats' | 'invoices'| 'companies' {
  if (/\/api\/contacts\/[a-f0-9]+$/.test(URL)) {
      return 'contact';
  } else if (/\/contacts\/pagination\/\d+\/\d+$/.test(URL)) {
      return 'contacts';
  } else if (/\/api\/stats$/.test(URL)){
    return 'stats';
  } else if (/\/api\/invoices\/pagination\/\d+\/\d+$/.test(URL)) {
    return 'invoices';
  } else if (/\/api\/companies\/pagination\/\d+\/\d+$/.test(URL)) {
    return 'companies';
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
  const [nbrPageCompanies, setNbrPageCompanies] = useState<number>(0);
    

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
                  setInvoices(data.pageResults);
                  setNbrPageInvoice(data.totalPages)
                } else if (responseType ==="companies") {
                  const data: Companies = await response.json();
                  setCompanies(data.pageResults);
                  setNbrPageCompanies(data.totalPages)
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

    return { loading, error, contacts, contact, nbrPageContact, stats, invoices, nbrPageInvoice, companies, nbrPageCompanies };

}