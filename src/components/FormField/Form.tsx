// Form.tsx
import type {
  FormHTMLAttributes,
  ReactNode,
} from "react";
import { useFormContext } from "../../core/Form/FormContext";
import { FormProvider } from "../../core/Form/FormProvider";
import type { ValidationErrors } from "../../core/validator";




type FormProps<
  T extends Record<string, unknown>,
> =
  Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    children: ReactNode;

    initialState: T;

    validator: {
      validate: (
        form: T,
      ) => ValidationErrors;
    };

    onSubmit: (
      values: T,
    ) => Promise<void> | void;
  };

function InnerForm({
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
  const { submit } =
    useFormContext();

  return (
    <form
      {...props}
      onSubmit={submit}
    >
      {children}
    </form>
  );
}

export default function Form<
  T extends Record<string, unknown>,
>({
  children,
  initialState,
  validator,
  onSubmit,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider
      initialState={initialState}
      validator={validator}
      onSubmit={onSubmit}
    >
      <InnerForm {...props}>
        {children}
      </InnerForm>
    </FormProvider>
  );
}