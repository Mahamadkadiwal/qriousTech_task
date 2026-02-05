import toast from 'react-hot-toast';
import { productSchema } from '../Schema/Product';
import { Product } from '../_types/Product';
import { Column } from '../_types/tablecrud';
import { deleteProduct, updateProduct } from '../actions/product.action';
import TableCrud from './TableCrud';

export default function ProductTable({ products, onRefresh }: { products?: Product[], onRefresh?: () => void }) {


  if (!products) return <div>Loading...</div>;

  async function handleSave(id: string, updatedRow: Product) {
    try {
      const parsed = productSchema.safeParse(updatedRow);
      if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message;
        toast.error(firstError || "Invalid data");
        return;
      }

      await updateProduct(id, updatedRow);
      onRefresh && onRefresh();
      toast.success('Product updated successfully');
    } catch (err) {
      console.log('error', err);
      toast.error('Failed to update product');
    }
  }

  async function handleDelete(id: string) {
    try {
      // deleteProduct(id);
      await deleteProduct(id);
      // fetchProducts();
      onRefresh && onRefresh();
      toast.success('Product deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product');
    }
  }



  const columns: Column<Product>[] = [
    { headers: "Name", key: "name" as keyof Product },
    { headers: "Description", key: "description" as keyof Product },
    { headers: "Image", key: "image" as keyof Product },
    { headers: "Price", key: "price" as keyof Product },
  ];
  return (
    <>

      <TableCrud<Product> data={products} columns={columns} onSave={handleSave} onDelete={handleDelete} />
    </>

  )
}
