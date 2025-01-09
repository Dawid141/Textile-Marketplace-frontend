export interface ListingDTO {
  productName: string;
  shortDescription: string; // Required, must not be null, blank, or exceed 256 characters
  longDescription: string; // Required, must not be null, blank, or exceed 2048 characters
  price: number; // Required, must not be null, and must be greater than 1
  quantity: number; // Required, must not be null, and must be greater than 1
  fabricType: string; // Required, must not be null
  images: string[]; // Non required field
  composition: string; // Required, must not be null
  technologies: string; // Required, must not be null
  safetyRequirements: string; // Required, must not be null
  colour: string; // Required, must not be blank
  width: number; // Required, must not be blank
}
