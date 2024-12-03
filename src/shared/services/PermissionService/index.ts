import { WithPermission } from "./WithPermission";
import { PermissionRoute } from "./PermisssionRoute";
import { usePermissionService } from "./hooks";
import PermissionService from "./PermissionService";

const permissionService = new PermissionService();

export { permissionService, WithPermission, usePermissionService, PermissionRoute };
