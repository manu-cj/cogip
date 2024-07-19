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

export type Contact = {
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

export type Contacts = {
    totalResults: number;
    totalPages: number;
    pageResults: Contact[];
};