import type { Image } from "./common";

export type Product = {
  id?: string;
  name?: string;
  productName: string;
  description?: string;
  price: number; // có thể đổi thành number nếu parse
  stock?: number;
  imageUrls?: Image[];
  categoryName?: string;
  categoryId?: string;
};

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export interface ProductResDto {
  data: Product[];
  pagination: Pagination;
}

export type GetAllProductParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: string;
};
