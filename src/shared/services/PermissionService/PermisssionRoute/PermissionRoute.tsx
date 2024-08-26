import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { permissionService } from "src/shared/services/PermissionService";
import {
    Permission,
    PermissionLevel,
    PermissionType,
} from "src/shared/services/PermissionService/types";

interface PermissionRouteProps {
    path: string;
    type?: PermissionType;
    level?: PermissionLevel;
    redirectPath?: string;
}
const PermissionRoute: FC<PermissionRouteProps> = ({ path, level, type, redirectPath = "/" }) => {
    const permission: Permission = {
        level: level || PermissionLevel.READ,
        path: path,
        type: type || PermissionType.FORM,
    };
    const access = permissionService.check(permission);

    if (!access) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default PermissionRoute;
