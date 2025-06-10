// app/interfaces/user.ts
export interface User {
  name: string;
  email: string;
  destinations?: Destination[]; // Optional, if a user has recommended destinations
}

export interface Destination {
  name: string;
  continentName: string;
}
