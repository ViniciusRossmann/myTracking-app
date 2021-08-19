export interface RouterProps{
    initialRoute: string;
}

export interface Position{
    lat: number;
    long: number;
}

export interface User{
    _id: string;
    name: string;
    email: string;
}

export interface Delivery{
    _id: string;
    status: number;
    description: string;
    user: User;
    driver: string;
    position?: Position
}

export interface LoginRequest{
    email: string;
    password: string;
}
