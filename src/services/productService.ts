import axios from "./axiosClient";
import type {
  GetAllProductParams,
  Product,
  ProductResDto,
} from "../types/product";

export const ProductService = {
  async getAll(params?: GetAllProductParams): Promise<ProductResDto> {
    const res = await axios.get<ProductResDto>("/products", { params });
    return res.data;
  },

  async getById(id: string): Promise<Product> {
    const res = await axios.get<Product>(`/products/${id}`);
    return res.data;
  },

  async create(product: Partial<Product>): Promise<Product> {
    const res = await axios.post<Product>("/products", product);
    return res.data;
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const res = await axios.put<Product>(`/products/${id}`, product);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`/products/${id}`);
  },
};

export default ProductService;
