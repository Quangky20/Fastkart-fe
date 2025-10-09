import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createProduct,
  fetchProductDetail,
  updateProduct,
} from "../../../redux/productSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { Product } from "../../../types/product";
import { useEffect, useRef } from "react";
import InputField from "../../../components/form/input/InputField";
import NumberField from "../../../components/form/number/NumberField";
import SelectField from "../../../components/form/select/SelectField";
import { API_URL, BASE_API_URL } from "../../../constants";

const schema = yup
  .object({
    productName: yup.string().required("Product name is required"),
    price: yup.number().positive().required("Price is required"),
  })
  .required();

type ProductFormProps = {
  initialData?: Product | null;
  onClose?: () => void;
};

const mockCategoriesOpts = [
  {
    value: "ec3226aa-6c87-4f78-ab0b-50ffe7ac4f2",
    label: "Đồ dùng học tập",
  },
  {
    value: "074f0b71-5012-46d7-ae9b-ef2d7fb9b06e",
    label: "Quần áo trẻ em",
  },
];

function ProductForm({ initialData = null, onClose }: ProductFormProps) {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const product = useAppSelector((state) => state.product.product);
  const loading = useAppSelector((state) => state.product.loading);

  const methods = useForm<Product>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      productName: "",
      price: 0,
      description: "",
      imageUrls: [],
    },
  });
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  // Field Array for imageUrls
  const { fields, append, remove } = useFieldArray({
    control,
    name: "imageUrls",
  });

  // Handle file upload and convert to base64 or URL
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file); // "files" phải trùng với upload.array("files")
    });

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData, // KHÔNG cần headers
      });
      const data: { urls: string[] } = await res.json();
      data.urls.forEach((url: string) => append({ url: BASE_API_URL + url }));
    } catch (error) {
      console.error("Upload error", error);
    }

    e.target.value = "";
  };

  const onSubmit = async (data: Product) => {
    try {
      if (initialData && initialData.id) {
        await dispatch(updateProduct({ id: initialData.id, data })).unwrap();
      } else {
        await dispatch(createProduct(data)).unwrap();
      }
      reset();
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product]);

  useEffect(() => {
    dialogRef?.current?.showModal();
    if (initialData) {
      dispatch(fetchProductDetail(initialData.id as string));
    }
  }, []);

  return (
    <dialog
      id="product_form_dialog"
      ref={dialogRef}
      className="modal modal-open"
    >
      <FormProvider {...methods}>
        <form
          method="dialog"
          className="modal-box max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg mb-4">
            {initialData ? "Update Product" : "Create Product"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField<Product>
              control={control}
              name="productName"
              label="Product Name"
            />
            <NumberField<Product>
              control={control}
              name="price"
              label="Price"
            />
            <SelectField<Product>
              options={mockCategoriesOpts}
              name="categoryId"
              label="Category"
            />
            <div className="textarea-field flex flex-col col-span-2 md:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                placeholder="Description"
                className={`input input-bordered w-[100%] h-[100px] ${
                  errors.description ? "input-error" : ""
                }`}
                disabled={isSubmitting}
              ></textarea>
              {errors.description && (
                <span className="text-error text-xs mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="col-span-2">
              <label className="label">
                <span className="label-text font-semibold">Product Images</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full mb-2"
                onChange={handleImageUpload}
                disabled={isSubmitting}
              />
              <div className="grid grid-cols-4 gap-2">
                {fields.map((field, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={field.url}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                      onClick={() => remove(idx)}
                      disabled={isSubmitting}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {fields.length === 0 && (
                <span className="text-gray-400 text-xs">
                  No images uploaded.
                </span>
              )}
            </div>
            {/* Add more fields here if needed */}
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading && <span className="loading loading-ring"></span>}
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </FormProvider>
    </dialog>
  );
}

export default ProductForm;
