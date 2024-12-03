import { FC, ReactNode } from "react";
import { permissionService } from "..";
import { Permission } from "../types";

interface WithPermissionProps {
    permission: Permission;
    children: ReactNode;
}

const WithPermission: FC<WithPermissionProps> = ({ permission, children }) => {
    return permissionService.check(permission) ? children : <></>;
};

export default WithPermission;
