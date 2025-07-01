export interface Attendance {
    type: 'Entrance' | 'Departures';
    timestamp: Date;
    location?: {
      lat: number;
      lng: number;
    }
    pic: string;
    userId: string;
}