export interface Cart {
  id: string;
  customer_name: string;
  product_name: string;
  amount: string;
}

export interface CartWithDetails extends Cart {
  image?: string;
  description?: string;
}
