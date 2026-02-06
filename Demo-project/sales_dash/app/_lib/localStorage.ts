import bcrypt from "bcryptjs";
import { Order } from "../_types/order";
import { Product } from "../_types/Product";
import { Users } from "../_types/user";
import { Cart } from "../_types/cart";
import { Payment } from "../_types/payment";

export function getUsers(): Users[] {
  const userData = localStorage.getItem("users");
  return userData ? JSON.parse(userData) : [];
}

export function getCurrentUser(): Users | null {
  const userData = localStorage.getItem("currentUser");
  return userData ? JSON.parse(userData) : null;
}

export function handleLogoutAdmin() {
  localStorage.removeItem("currentAdmin");
}

export function getCurrentAdmin(): Users | null {
  const admin = localStorage.getItem("currentAdmin");
  return admin ? JSON.parse(admin) : null;
}

export function saveUser(data: Users): void {
  // const users = getUsers();
  // if (users.find((user) => user.email === data.email)) {
  //   throw new Error("User with this email already exists");
  // }

  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(data.password, salt);

  // const newData = {
  //   ...data,
  //   password: hash,
  // };

  const localUser = {
    userId: data.userId,
    username: data.username,
    email: data.email,
    role: data.role,
  };

  if (data.role === "admin") {
    localStorage.setItem("currentAdmin", JSON.stringify(localUser));
  } else if (data.role === "user") {
    localStorage.setItem("currentUser", JSON.stringify(localUser));
  }
  // users.push(newData);
  // localStorage.setItem("users", JSON.stringify(users));
}

export function authenticateUser(
  data: Pick<Users, "email" | "password" | "role" | "username" | "userId">,
) {
  // const users = getUsers();

  // const user = users.find((user) => user.email === data.email);
  // if (!user) {
  //   throw new Error("Invalid email or password");
  // }

  // const isMatch = bcrypt.compareSync(data.password, user.password);
  // if (!isMatch) {
  //   throw new Error("Invalid email or password");
  // }

  // if (user.role !== data.role) {
  //   throw new Error("User role mismatch");
  // }

  const localUser = {
    userId: data.userId,
    username: data.username,
    email: data.email,
    role: data.role,
  };

  if (data.role === "admin") {
    localStorage.setItem("currentAdmin", JSON.stringify(localUser));
  } else if (data.role === "user") {
    localStorage.setItem("currentUser", JSON.stringify(localUser));
  }
}

export function updateAllUsers(userData: Users, updatedUser: Users) {
  const users = getUsers() || [];

  const userIndex = users.findIndex((u: Users) => u.email === userData.email);
  console.log(userIndex);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// orders
export function getOrders(): Order[] {
  const orderData = localStorage.getItem("orders");
  if (!orderData) return [];
  const orders: Order[] = JSON.parse(orderData);
  return orders.sort(
    (a, b) =>
      new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
  );
}

export function addOrder(data: Order): Order {
  const orders = getOrders();
  const id = String(orders.length + 1);
  data.id = id;
  if (data == null) {
    throw new Error("Invalid order data");
  }
  orders.push(data);

  localStorage.setItem("orders", JSON.stringify(orders));
  return data;
}

export function editOrder(id: string, data: Partial<Order>): void {
  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.id === id ? { ...order, ...data } : order,
  );
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter((order) => order.id !== id);
  localStorage.setItem("orders", JSON.stringify(orders));
}

// cart
export function getCart(): Cart[] {
  const cartData = localStorage.getItem("carts");
  if (!cartData) return [];
  const carts: Cart[] = JSON.parse(cartData);
  return carts;
}

export function addCart(data: Cart): void {
  const carts = getCart();
  const existingCart = carts.findIndex(
    (cart) =>
      cart.product_name === data.product_name &&
      cart.customer_name === data.customer_name,
  );
  if (existingCart !== -1) {
    carts[existingCart].quantity =
      (carts[existingCart].quantity || 1) + data.quantity;
    localStorage.setItem("carts", JSON.stringify(carts));
    return;
  }
  const id = String(carts.length + 1);
  data.id = id;
  if (data == null) {
    throw new Error("Invalid cart data");
  }
  carts.push(data);

  localStorage.setItem("carts", JSON.stringify(carts));
}

export function editCart(id: string, data: Partial<Cart>): void {
  const carts = getCart();
  const updatedCarts = carts.map((cart) =>
    cart.id === id ? { ...cart, ...data } : cart,
  );
  localStorage.setItem("carts", JSON.stringify(updatedCarts));
}

export function cartDelete(id: string): void {
  const carts = getCart().filter((cart) => cart.id !== id);
  localStorage.setItem("carts", JSON.stringify(carts));
}

export function updateCartQuantity(id: string, qty: number) {
  const carts = getCart() || [];

  const updated = carts.map((cart) =>
    cart.id === id ? { ...cart, quantity: qty } : cart,
  );

  localStorage.setItem("carts", JSON.stringify(updated));
}

export function clearCart(id: string): void {
  const carts = getCart() || [];

  const updated = carts.filter(cart => cart.userId !== id);
  localStorage.setItem("carts", JSON.stringify(updated));
}

// add payment
export function addPayment(data: Payment): void {
  if (!data) throw new Error("Invalid payment data");

  const payments = JSON.parse(localStorage.getItem("payments") || "[]");

  const id = String(payments.length + 1);
  data.id = id;

  const newPayment = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  payments.push(newPayment);

  localStorage.setItem("payments", JSON.stringify(payments));
}

// products
export function getProduct(): Product[] {
  try {
    const productData = localStorage.getItem("products");
    return productData ? JSON.parse(productData) : [];
  } catch (error) {
    console.log("Error parsing product data:", error);
    return [];
  }
}

export function addProduct(data: Omit<Product, "id">): void {
  const products = getProduct();
  const id = String(products.length + 1);
  const newProduct: Product = { ...data, id };
  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));
}

export function editProduct(id: string, data: Partial<Product>): Product[] {
  try {
    const products = getProduct();
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...data } : product,
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    return updatedProducts;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export function deleteProduct(id: string): void {
  const products = getProduct().filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
}

export function dashboardCountData() {
  const customers = getUsers().filter((u) => u.role === "user").length;

  const totalOrders = getOrders();
  const totalIncome = totalOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((t, o) => t + Number(o.amount), 0);

  const products = getProduct().length;

  return {
    customers,
    totalOrders: totalOrders.length,
    products,
    totalIncome,
  };
}
