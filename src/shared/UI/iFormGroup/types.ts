import { ReactNode } from "react";

export interface FormProps {
    label: string;
    children?: ReactNode;
    className?: string;
    fullHeight?: boolean;
}
