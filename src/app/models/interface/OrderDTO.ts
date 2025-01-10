export interface OrderDTO {
  orderQuantity: number, // required when creating an order
  listingId: string, // required when creating an order need to change to number
  newOrderPrice: number, // required when creating an order
}
