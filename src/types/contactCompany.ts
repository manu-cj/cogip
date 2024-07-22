type Image = {
    filename: string;
    path: string;
    originalName: string;
    uploadDate: string;
  };
  
  type Company = {
    _id: string;
    name: string;
  };
  
 export  type ContactCompany = {
    image: Image;
    _id: string;
    name: string;
    companyId: Company;
    email: string;
    phoneNr: string;
    createdAt: string;
    updatedOn: string; 
    __v: number;
  };
  
 export type ContactsList = {
    contacts: ContactCompany[];
  };

  