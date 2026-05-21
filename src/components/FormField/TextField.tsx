// TextField.tsx
import { useFormContext } from "../../core/Form/FormContext";
import styles from "./styles.module.css";

type TextFieldProps<T extends Record<string, unknown> = Record<string, unknown>,> = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: keyof T;
};

export default function TextField<
  T extends Record<string, unknown> = Record<
    string,
    unknown
  >,
>({
  label,
  name,
  ...props
}: TextFieldProps<T>) {
  const {
    form,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleFocus,
    isSubmitting
  } = useFormContext<T>();

  const isError = touched[name] && errors[name];

  return (
    <div
      className={`${styles.group} ${isError ? styles.error : ""
        }`}
    >
      {label && <label htmlFor={props.id}>
        {label}
      </label>}

      <input
        {...props}
        disabled={
          props.disabled ||
          isSubmitting
        }
        name={String(name)}
        value={String(form[name] ?? "")}
        onFocus={(e) => {
          handleFocus(e);
          props.onFocus?.(e);
        }}
        onChange={(e) => {
          handleChange(e);
          props.onChange?.(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
          props.onBlur?.(e);
        }}
        className={
          isError
            ? styles.inputError
            : ""
        }
      />

      {isError && (
        <span className={styles.errorText}>
          {errors[name as string]}
        </span>
      )}
    </div>
  );
}