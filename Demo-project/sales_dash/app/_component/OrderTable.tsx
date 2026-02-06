"use client";
import toast from "react-hot-toast";
import { Order, OrderWithDetails } from "../_types/order";
import { deleteOrder, updateOrder } from "../actions/order.action";
import { orderSchema } from "../Schema/Order";
import { formatDate } from "../utils/formatDate";
import TableCrud from "./TableCrud";

export default function OrderTable({ orders, onRefresh }: { orders: OrderWithDetails[], onRefresh?: () => void }) {

  if (!orders) return null;

  async function handleSave(id: string, updatedRow: Order) {
    try {
      const parsed = orderSchema.partial().safeParse(updatedRow);
      if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message;
        toast.error(firstError || "Invalid data");
        return;
      }

      const updatedOrderData = {
        userId: updatedRow.userId?._id,
        items: updatedRow.items,
        status: updatedRow.status
      }
      const edit = await updateOrder(id, updatedOrderData);
      if (edit) {
        toast.success('Order updated successfully');
        onRefresh && onRefresh();
      }

    } catch (error) {
      console.log(error);
      toast.error('Failed to update order');
    }

  }

  async function handleDelete(order_id: string) {
    try {
      const res = await deleteOrder(order_id);
      if (res) {
        toast.success(res?.message);
        onRefresh && onRefresh();
      } 
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete order');
    }
  }


  const columns = [
    { headers: "Customer Name", key: "customer_name" as keyof OrderWithDetails },
    { headers: "Product Name", key: "product_name" as keyof Order },
    { headers: "Amount", key: "totalAmount" as keyof Order },
    { headers: "Order Date", key: "orderDate" as keyof Order },
    { headers: "Status", key: "status" as keyof Order },
  ];

  const formattedOrders: OrderWithDetails[] = orders.map(order => ({
    id: order.id,
    customer_name: order.userId.username,
    product_name: order.items.map(i => i.name).join("\n"),
    totalAmount: order.totalAmount,
    orderDate: formatDate(order.orderDate),
    status: order.status,
    items: order.items,
    userId: order.userId,
  }));

  if (!orders || orders.length === 0) return <div>No orders found</div>;

  return (
    <>
      <TableCrud<OrderWithDetails> data={formattedOrders} columns={columns} onSave={handleSave} onDelete={handleDelete} />
    </>
  );
}
