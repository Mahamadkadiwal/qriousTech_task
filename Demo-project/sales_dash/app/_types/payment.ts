export type Payment = {
  id?: string;
  orderIds: string[];
  cardHolder: string;
  cardNumber: string;
  amount: number;
  userId?: string;
};
