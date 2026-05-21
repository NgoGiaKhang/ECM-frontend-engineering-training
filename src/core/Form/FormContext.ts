import { createContext, useContext } from "react";
import type { FormElement } from "./types";
import type { ValidationErrors } from "../validator";

type FormContextValue<T extends Record<string, unknown>> = {
  form: T;
  touched: Partial<Record<keyof T, boolean>>;
  errors: ValidationErrors;
  hasError: boolean;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<FormElement>) => void;
  handleBlur: (e: React.FocusEvent<FormElement>) => void;
  handleFocus: (e: React.FocusEvent<FormElement>) => void;
  reset: () => void;
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const FormContext = createContext<FormContextValue<any> | null>(null);
export function useFormContext<T extends Record<string, unknown>>() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used inside FormProvider");
  }

  return context as FormContextValue<T>;
}
