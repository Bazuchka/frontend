import { MenuItem } from "src/app/layout/sidebar/menu/config/menuConfiguration";

export function getObjectByPath(data: MenuItem[], path: string): MenuItem | null {
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];

        if (obj.path === path) {
            return obj;
        }

        if (obj.children && obj.children.length > 0) {
            const nestedObj = getObjectByPath(obj.children, path);

            if (nestedObj) {
                return nestedObj;
            }
        }
    }

    return null;
}
