import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type NumberFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  children?: ReactNode;
  label: string;
};

function NumberField<T extends FieldValues>({
  label,
  name,
  control,
  type = "number",
}: NumberFieldProps<T>) {
  return (
    <div className="number-field">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({
          field,
          fieldState: { error },
          formState: { isSubmitting },
        }) => (
          <>
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
          </>
        )}
      />
    </div>
  );
}

export default NumberField;
