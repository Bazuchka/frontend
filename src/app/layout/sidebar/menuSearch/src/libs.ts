import { MenuItemWithIsVisible } from "../../menu/libs";
import { SearchMenuItem } from "../types/types";

export const getFlatList = (list: MenuItemWithIsVisible[], parent = [""]): SearchMenuItem[] => {
    const filteredList = list.filter((item) => !item.isInvisibleMenuItem && item.isVisible);
    return filteredList.reduce<SearchMenuItem[]>((acc, item) => {
        if (item?.children?.length) {
            return [
                ...acc,
                ...getFlatList(item.children as MenuItemWithIsVisible[], [...parent, item.label]),
            ];
        }
        const { label, key, path } = item;
        const breadcrumbs = [...parent, label].filter((item) => !!item);
        return [...acc, { label, key, path, breadcrumbs }];
    }, [] as SearchMenuItem[]);
};

export const filterList = (list: SearchMenuItem[], value: string) =>
    value ? list.filter((item) => item.label.toLowerCase().includes(value.toLowerCase())) : [];
