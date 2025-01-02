export interface Order {
  data: Array<OrderData>; //scrape from DB
}

export interface OrderListing {
  listingData: Array<OrderListingDetails>; //for display
}

export interface OrderData {
  id: number;
  orderQuantity: number;
  listingId: number;
  newOrderPrice: number;
  orderStatus: string;
}

export interface OrderListingDetails {
  id: number;
  orderQuantity: number;
  productImage : string;
  brand: string;
  listingId: number;
  listingName: string;
  listingQuantity: number;
  newOrderPrice: number;
  oldOrderPrice: number;
  orderStatus: string;
}
