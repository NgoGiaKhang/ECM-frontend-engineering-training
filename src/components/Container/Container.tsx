import styles from "./styles.module.css";
import type {
    ElementType,
} from "react";


type ContainerSize =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "full";

type ContainerPadding =
    | "none"
    | "sm"
    | "md"
    | "lg";

type ContainerProps<
    T extends ElementType = "div",
> = {
    as?: T;

    size?: ContainerSize;

    padding?: ContainerPadding;

    className?: string;
} & React.ComponentPropsWithoutRef<T>;

export default function Container<
    T extends ElementType = "div",
>({
    as,
    children,
    size = "xxl",
    padding = "md",
    className,
    ...props
}: ContainerProps<T>) {
    const Component =
        as || "div";

    return (
        <Component
            {...props}
            className={`
        ${styles.container}
        ${styles[size]}
        ${styles[`padding-${padding}`]}
        ${className ?? ""}
      `}
        >
            {children}
        </Component>
    );
}