export interface RouterProps{
    initialRoute: string;
}

interface Coords{
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
}

export interface Location{
    coords: Coords;
    mocked?: boolean,
    timestamp: number,
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
    location?: Location;
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface NewDelivery{
    description: string;
    user: string;
}

