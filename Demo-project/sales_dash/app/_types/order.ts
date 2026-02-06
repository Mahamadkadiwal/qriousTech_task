import { Status } from "./input";

export interface Order {
  id: string;
  customer_name: string;
  product_name: string;
  totalAmount: number;
  orderDate: string;
  status: Status;
  // _id?: string;
}

export interface OrderWithDetails extends Order {
  items: {
    name: string;
    price: number;
    quantity: number;
    productId?: {
      image?: string;
      description?: string;
    };
  }[];
  userId: {
    _id: string;
    username: string;
    email: string;
  };
}
