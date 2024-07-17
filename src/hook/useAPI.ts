import { useState, useEffect } from "react";
import { Contact, Contacts } from "../types/contactsType"; // A adapter

function getResponseType(URL: string): 'contacts' | 'categories' | 'details' | "similar" | "topRated" | "trending" {
  if (URL.includes("/contacts/")) {
      return 'contacts';
  } else if (URL.includes("/genre/movie/list")) {
      return 'categories';
  } else if(URL.includes("/similar")){
    return 'similar';
  } else if(URL.includes("/top_rated")){
    return 'topRated'
  } else if(URL.includes("/movie/week")){
    return 'trending'
  } else {
      return 'details';
  }
}

export default function useAPI(URL : string) {
    const [contacts, setContacts] = useState<Contact>({} as Contact);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

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

                if (responseType === 'contacts') {
                    const data: Contact = await response.json();
                    setContacts(data);
                // } else if (responseType === 'categories') {
                //     const data: Categorie = await response.json();
                //     setCategorie(data.genres);
                // } else if (responseType === 'details') {
                //     const data: Details = await response.json();
                //     setDetails(data);
                // } else if (responseType === 'similar') {
                //     const data: ApiResponseMovie = await response.json();
                //     setSimilar(data.results);
                // } else if (responseType === 'topRated') {
                //     const data: ApiResponseMovie = await response.json();
                //     setTopRated(data.results);
                // } else if(responseType === 'trending') {
                //     const data: ApiResponseMovie = await response.json();
                //     setTrending(data.results);
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

    return { contacts, loading, error};

}