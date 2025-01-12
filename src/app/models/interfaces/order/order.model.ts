export interface Order {
  listingName: string;
  productImage : string;
  id: number;
  messages : string;
  listingQuantity: number;
  orderQuantity: number;
  listingId: number;
  newOrderPrice: number;
  oldOrderPrice: number;
  orderStatus: string;
}

export interface OrderListing {
  listingData: Array<OrderListingDetails>; //for display
}

export interface OrderListingDetails {
  id: number;
  orderQuantity: number;
  productImage : string;
  listingId: number;
  listingName: string;
  listingQuantity: number;
  newOrderPrice: number;
  oldOrderPrice: number;
  orderStatus: string;
  isGrouped?: boolean;
}
