export interface Order {
  data: Array<OrderData>;
}

export interface OrderListing {
  listingData: Array<OrderListingDetails>;
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
  listingId: number;
  listingName: string;
  newOrderPrice: number;
  oldOrderPrice: number;
  orderStatus: string;
}
