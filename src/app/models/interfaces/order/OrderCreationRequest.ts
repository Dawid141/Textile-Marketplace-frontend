export interface OrderCreationRequest {
  orderQuantity: number, // required when creating an order
  listingId: string, // required when creating an order need to change to number
  price: number, // required when creating an order,
  message: string // not required field
}
