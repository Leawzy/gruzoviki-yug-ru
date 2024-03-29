export interface AdminTypeUser {
    password?: string;
    address: string;
    phoneNumber: string;
    role: string;
    email: string;
    lastName: string;
    firstName: string;
    id: string;
    total: number;
    users: users;
}

export interface AdminTypeBrand {
    img: string;
    title: string;
    id: string;
    brand: brandType;
}

export interface users {
    total: number;
}

export interface brandType {
    total: number;
}
