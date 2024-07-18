import { useState, useEffect } from "react";
import { Contact, Contacts } from "../types/contactsType"; // A adapter

function getResponseType(URL: string): 'contact' | 'contacts' {
  if (/\/api\/contacts\/[a-f0-9]+$/.test(URL)) {
      return 'contact';
  } else if (/\/api\/contacts$/.test(URL)) {
      return 'contacts';
  } else {
    throw new Error("Invalid URL format");
  }
}

export default function useAPI(URL : string) {
    const [contact, setContact] = useState<Contact>({} as Contact);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    

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
                    setContacts(data.contacts);
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

    return { loading, error, contacts, contact };

}