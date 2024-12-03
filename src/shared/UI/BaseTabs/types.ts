import { ReactNode } from "react";
import { PermissionType } from "src/shared/services/PermissionService/types";

export interface TabItem {
    label: ReactNode | string;
    type: TabType;
    component: ReactNode;
    permission?: {
        path: string;
        type: PermissionType;
    };
    id?: string;
    route?: string;
    disabled?: boolean;
    visibleRule?: () => boolean;
}

export interface TabsConfiguration {
    header?: ReactNode | string;
    items: TabItem[];
}

export enum TabType {
    MAIN_LIST,
    MAIN_INFO,
    LINKED_DATA,
    CUSTOM,
    OTHER,
}
