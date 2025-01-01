export interface Offer {
  data: Array<listingData>
}

export interface listingData {
  id: number;
  imageLink: string;
  productName: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  quantity: number;
}
