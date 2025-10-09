import type {
  GetAllProductParams,
  Pagination,
  Product,
} from "../types/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ProductService from "../services/productService";
import type { RootState } from "./store";
import type { TAny } from "../types/common";
import { showToast } from "../utils/toast";

type ProductState = {
  products: Product[];
  product: Product | null;
  params: GetAllProductParams;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  product: null,
  params: {},
  pagination: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts", // type
  async (payload: GetAllProductParams, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const params = payload || state.product.params;
      const response = await ProductService.getAll(params);
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);
export const fetchProductDetail = createAsyncThunk(
  "product/fetchProductDetail", // type
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await ProductService.getById(payload);
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct", // type
  async (payload: Product, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.create(payload);
      dispatch(fetchProducts({})); // Gọi lại fetchProducts để cập nhật danh sách sản phẩm
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.error || "Lỗi không xác định"
        );
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct", // type
  async (
    payload: { id: string; data: Product },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await ProductService.update(payload.id, payload.data);
      dispatch(fetchProducts({})); // Gọi lại fetchProducts để cập nhật danh sách sản phẩm
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.error || "Lỗi không xác định"
        );
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct", // type
  async (payload: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.remove(payload);
      dispatch(fetchProducts({})); // Gọi lại fetchProducts để cập nhật danh sách sản phẩm
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.params = action.meta.arg;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.map((item) => ({
          ...item,
          imageUrls: JSON.parse(item.imageUrls as TAny),
        })); // Cập nhật danh sách sản phẩm
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });

    builder
      // fetchProductDetail
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = {
          ...action.payload,
          productName: action.payload.name!,
          imageUrls: JSON.parse(action.payload.imageUrls as TAny),
        };
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });

    builder
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        showToast("Created successfully.");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
        showToast(state.error, "error");
      });

    builder
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        showToast("Updated successfully.");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
        showToast(state.error, "error");
      });

    builder
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        showToast("Deleted successfully.");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
        showToast(state.error, "error");
      });
  },
});

// Export actions và reducer
export const { clearProductDetail } = productSlice.actions;
export default productSlice.reducer;
