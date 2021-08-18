export interface RouterProps{
    initialRoute: string;
}

export interface Position{
    lat: number;
    long: number;
}

export interface Delivery{
    _id: string;
    status: number;
    description: string;
    user: string;
    driver: string;
    position?: Position
}

export interface LoginRequest{
    email: string;
    password: string;
}
