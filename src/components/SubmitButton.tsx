// SubmitButton.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { useFormContext } from "../core/Form/FormContext";
import Button, { type ButtonProps } from "./Button/Button";

type SubmitButtonProps = ButtonProps & {
        loader?: ReactNode;
    };

export default function SubmitButton({
    children,
    loader: loadingText = "Submitting...",
    disabled,
    width = 'full',
    ...props
}: SubmitButtonProps) {
    const {
        isSubmitting,
        hasError,
        touched
    } = useFormContext();

    const hasTouched = Object.values(touched,).some(Boolean);

    const isDisabled = disabled ||isSubmitting ||(hasError && hasTouched)

    return (
        <Button
            {...props}
            width={width}
            type="submit"
            disabled={isDisabled}
        >
            {isSubmitting
                ? loadingText
                : children}
        </Button>
    );
}