import { useEffect } from "react";
import { permissionService } from "src/shared/services/PermissionService";
import { Permission, PermissionLevel } from "src/shared/services/PermissionService/types";

const usePermissionService = () => {
    const { loading, permissions } = permissionService;

    const check = (permission: Permission): boolean => {
        return permissionService.check(permission);
    };

    const getAccessGrantedObjects = <T extends { permission?: Permission }>(
        items: T[],
        level: PermissionLevel = PermissionLevel.READ
    ) => {
        return items.filter(
            ({ permission }) =>
                !permission ||
                permissionService.check({
                    path: permission.path,
                    type: permission.type,
                    level,
                })
        );
    };

    useEffect(() => {
        if (permissions.length === 0) {
            permissionService.load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, check, getAccessGrantedObjects };
};

export default usePermissionService;
