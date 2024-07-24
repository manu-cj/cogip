export type User = {
    image: {
        filename: string;
        path: string;
        originalName: string;
        uploadDate: string;
    };
    _id: string;
    firstName: string;
    lastName: string;
    roleId: {
        _id: string;
        name: string;
    };
    email: string;
    createdAt: string;
    updatedOn: string;
    __v: number;
};
