export interface Worker {
    firstName: string;
    lastName: string;
    avatar: string;
    present: boolean;
    id?: number;
    timestamp?: string;
    location?: {
        lat: number;
        lng: number;
    };
    photo?: string;
}