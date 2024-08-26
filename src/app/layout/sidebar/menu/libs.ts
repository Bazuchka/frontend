import { permissionService } from "src/shared/services/PermissionService";
import { PermissionLevel } from "src/shared/types";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { MenuItem } from "./config/menuConfiguration";

export interface MenuItemWithIsVisible extends Omit<MenuItem, "children"> {
    isVisible: boolean;
    children?: MenuItemWithIsVisible[];
}

const checkPermissions = (item: MenuItem) =>
    !item.permission ||
    permissionService.check({
        level: item.permission?.level || PermissionLevel.READ,
        path: item.permission?.path || "",
        type: item.permission?.type || PermissionType.FORM,
    });

export const updateMenuWithIsVisibleProp = (list: MenuItem[]): MenuItemWithIsVisible[] =>
    list.map((item) => {
        if (!item.children) {
            const isVisible = checkPermissions(item);
            return { ...item, isVisible } as MenuItemWithIsVisible;
        }
        const children = updateMenuWithIsVisibleProp(item.children);
        const filteredItems = children.filter(
            (item) => (!item.permission && item.isVisible) || checkPermissions(item)
        );
        return {
            ...item,
            children,
            isVisible: !!filteredItems.length,
        };
    });
