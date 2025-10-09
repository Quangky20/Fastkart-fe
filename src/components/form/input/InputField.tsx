import type { ReactNode } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  children?: ReactNode;
  label: string;
};

function InputField<T extends FieldValues>({
  label,
  name,
  control,
  type = "text",
}: InputFieldProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    rules: {},
  });

  return (
    <div className="input-field">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        {...field}
        type={type}
        placeholder={label}
        className={`input input-bordered ${error ? "input-error" : ""}`}
        disabled={isSubmitting}
      />
      {error && (
        <span className="text-error text-xs mt-1">{error.message}</span>
      )}
    </div>
  );
}

export default InputField;
