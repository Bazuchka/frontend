import { MenuItemWithIsVisible } from "../../menu/libs";

export type SearchMenuItem = Pick<MenuItemWithIsVisible, "key" | "label" | "path"> & {
    breadcrumbs: string[];
};

export interface SearchProps {
    menu: MenuItemWithIsVisible[];
    isSidebarOpen: boolean | undefined;
}

export type SearchResultItem = {
    label: string;
    path: string;
};
