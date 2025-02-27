export interface IBook {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  isDeleted: boolean;
  _id: string;
  __v: number;
}

export interface IBooks {
  data: {
    data: IBook[];
  };
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
