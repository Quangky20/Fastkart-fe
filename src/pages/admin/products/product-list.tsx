import { useCallback, useEffect, useState } from "react";
import {
  clearProductDetail,
  deleteProduct,
  fetchProducts,
} from "../../../redux/productSlice";
import ProductForm from "./product-form";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  FaEdit,
  FaTrash,
  FaSortUp,
  FaSortDown,
  FaSearch,
} from "react-icons/fa";
import { createPortal } from "react-dom";
import type { Pagination, Product } from "../../../types/product";
import type { TAny } from "../../../types/common";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const products = useAppSelector((state) => state.product.products);
  const pagination = useAppSelector((state) => state.product.pagination);
  const loading = useAppSelector((state) => state.product.loading);
  const params = useAppSelector((state) => state.product.params);
  const dispatch = useAppDispatch();

  const handleFetchProducts = (params: Record<string, TAny> = {}) => {
    setSearchParams(params);
    dispatch(fetchProducts(params));
  };

  const handleChangePage = useCallback(
    (page: number) => {
      handleFetchProducts({ ...params, page });
    },
    [params]
  );

  const handleSearch = useCallback(
    (e: TAny) => {
      e.preventDefault();
      const search = e.target.value;
      setSearch(search);
      handleFetchProducts({ ...params, search });
    },
    [params]
  );

  const handleSort = useCallback(
    (key: string) => {
      const order =
        params.sortField === key && params.sortOrder === "asc" ? "desc" : "asc";
      handleFetchProducts({
        ...params,
        sortField: key,
        sortOrder: order,
      });
    },
    [params]
  );

  const renderPageNumbers = (paging: Pagination) => {
    const result = [];
    if (paging) {
      for (let i = 1; i <= paging.totalPages; i++) {
        if (paging.page == i) {
          result.push(
            <button
              key={i}
              className="px-3 py-1 rounded border bg-purple-600 text-white font-bold"
            >
              {i}
            </button>
          );
        } else {
          result.push(
            <button
              key={i}
              onClick={() => handleChangePage(i)}
              className="px-3 py-1 rounded border bg-white text-gray-700 font-bold cursor-pointer"
            >
              {i}
            </button>
          );
        }
      }
    }
    return result;
  };

  const sortIcon = (key: string) =>
    params.sortField === key ? (
      params.sortOrder === "asc" ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      )
    ) : null;

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    handleFetchProducts(params);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <button className="btn" onClick={() => setShowModal(true)}>
          Add Product
        </button>
        <form className="flex items-center gap-2 border-1 px-2">
          <FaSearch></FaSearch>
          <input
            type="text"
            name="search"
            className="input input-bordered min-w-[260px] border-none p-0"
            placeholder="Search product or category name..."
            value={search}
            onChange={handleSearch}
          />
        </form>
      </div>
      {showModal &&
        createPortal(
          <ProductForm
            initialData={editItem}
            onClose={() => {
              dispatch(clearProductDetail());
              setEditItem(null);
              setShowModal(false);
            }}
          />,
          document.body
        )}
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl">
          <thead>
            <tr className="border-b text-gray-700">
              <th
                className="py-3 px-4 text-left font-semibold cursor-pointer select-none"
                onClick={() => handleSort("productName")}
              >
                Product Name {sortIcon("productName")}
              </th>
              <th
                className="py-3 px-4 text-left font-semibold cursor-pointer select-none"
                onClick={() => handleSort("price")}
              >
                Price {sortIcon("price")}
              </th>
              <th
                className="py-3 px-4 text-left font-semibold cursor-pointer select-none"
                onClick={() => handleSort("categoryName")}
              >
                Category {sortIcon("categoryName")}
              </th>
              <th
                className="py-3 px-4 text-left font-semibold cursor-pointer select-none"
                onClick={() => handleSort("stock")}
              >
                Stock {sortIcon("stock")}
              </th>
              <th className="py-3 px-4 text-left font-semibold">Image</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4">
                      <div className="skeleton w-32 h-4"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="skeleton w-16 h-4"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="skeleton w-20 h-4"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="skeleton w-10 h-4"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="skeleton w-12 h-12 rounded"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="skeleton w-14 h-4"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="skeleton w-16 h-4"></div>
                    </td>
                  </tr>
                ))
              : products?.map((product, idx) => (
                  <tr
                    key={product.id}
                    className={idx % 2 === 1 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4">{product.productName}</td>
                    <td className="py-3 px-4">
                      ${product.price?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {product.categoryName || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{product.stock ?? 0}</td>
                    <td className="py-3 px-4">
                      {product.imageUrls && product.imageUrls.length > 0 ? (
                        <img
                          src={product.imageUrls[0].url}
                          alt={product.productName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          product.categoryName === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {product.categoryName === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setEditItem(product);
                        }}
                        className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-700 rounded p-2 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteProduct(product.id as string));
                        }}
                        className="cursor-pointer bg-pink-200 hover:bg-pink-300 text-pink-700 rounded p-2"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            {!loading && products?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Example */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing 1 to {products?.length} of {products?.length} entries
        </div>
        <div className="flex gap-1">
          <button
            className={`px-3 py-1 rounded border cursor-pointer ${
              params.page == 1 && "disabled"
            }`}
            disabled={params.page == 1}
            onClick={() => handleChangePage(params.page! - 1)}
          >
            Previous
          </button>
          {renderPageNumbers(pagination!)}
          <button
            className={`px-3 py-1 rounded border cursor-pointer ${
              params.page == pagination?.totalPages && "disabled"
            }`}
            disabled={params.page == pagination?.totalPages}
            onClick={() => handleChangePage(params.page! + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
