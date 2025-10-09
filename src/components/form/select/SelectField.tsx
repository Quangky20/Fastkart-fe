import type { ReactNode } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import type { SelectOption } from "../../../types/common";

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  children?: ReactNode;
  label: string;
  options: SelectOption[];
};

function SelectField<T extends FieldValues>({
  label,
  name,
  options = [],
}: SelectFieldProps<T>) {
  const methods = useFormContext();
  const {
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const error = errors[name];

  return (
    <div className="select-field">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        {...register(name)}
        className={`select input-bordered ${error ? "input-error" : ""}`}
        disabled={isSubmitting}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-error text-xs mt-1">
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default SelectField;
