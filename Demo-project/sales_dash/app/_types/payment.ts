export type Payment = {
  id?: string;
  orderIds: string[];
  cardHolder: string;
  last4: string;
  amount: number;
};
