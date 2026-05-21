import { useMemo, useState } from "react";
import { FormContext } from "./FormContext";
import type { FormElement } from "./types";
import type { ValidationErrors } from "../validator";

type FormProviderProps<
    T extends Record<string, unknown>,
> = {
    children: React.ReactNode;
    initialState: T;
    validator: {
        validate: (form: T,) => ValidationErrors;
    };
    onSubmit: (values: T,) => Promise<void> | void;
};

export function FormProvider<
    T extends Record<string, unknown>,
>({
    children,
    initialState,
    validator,
    onSubmit,
}: FormProviderProps<T>) {
    const [form, setForm] = useState<T>(initialState);
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const errors = useMemo(() => {
        return validator.validate(form);
    }, [form, validator]);

    const hasError = Object.keys(errors).length > 0;

    const handleChange = (e: React.ChangeEvent<FormElement>,) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleFocus = (e: React.FocusEvent<FormElement>,) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: false,
        }));

    };

    const submit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const nextTouched = Object.keys(
            form,
        ).reduce(
            (acc, key) => ({
                ...acc,
                [key]: true,
            }),
            {} as Partial<
                Record<keyof T, boolean>
            >,
        );

        setTouched(nextTouched);

        if (hasError) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(form);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBlur = (e: React.FocusEvent<FormElement>,) => {
        const { name } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const reset = () => {
        setForm(initialState);
        setTouched({});
        setIsSubmitting(false);
    };

    return (
        <FormContext.Provider
            value={{
                form,
                touched,
                errors,
                hasError,
                isSubmitting,
                handleFocus,
                handleChange,
                handleBlur,
                reset,
                submit
            }}
        >
            {children}
        </FormContext.Provider>
    );
}