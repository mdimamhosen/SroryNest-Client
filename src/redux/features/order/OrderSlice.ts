export interface IOrder {
  transaction?: Transaction;
  _id: string;
  id: string;
  user: User;
  product: Product;
  quantity: number;
  status: string;
  totalPrice: number;
  paymentMethod: string;
  address: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Transaction {
  id: string;
  transactionStatus: string | number;
  bank_status?: string;
  date_time?: string;
  method?: string;
  sp_code?: string;
  sp_message?: string;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  isDeleted: boolean;
  __v: number;
}
