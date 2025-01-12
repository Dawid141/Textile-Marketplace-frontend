export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Iuser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  nip: string;
  subscription: Subscription
}

interface Subscription {
  endDate: Date
}

export interface IuserResponse {
  data: any;
  message: string;
  status: string;
}
