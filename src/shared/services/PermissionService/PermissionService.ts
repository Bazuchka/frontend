import { action, makeObservable, observable, runInAction } from "mobx";
import isArrayWithLength from "src/shared/helpers/checks";
import { permissionServiceActions } from "./actions";
import { Permission, PermissionLevel } from "./types";

class PermissionService {
    permissions: Permission[] = [];
    loading = false;

    constructor() {
        makeObservable(this, {
            permissions: observable,
            load: action,
        });
    }

    public async load() {
        this.loading = true;

        try {
            const result = await permissionServiceActions.getList<{
                userPermissions: Permission[];
            }>();

            runInAction(() => {
                if (result.status === 200) {
                    this.permissions = result.data?.userPermissions;
                }
            });
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    }

    public check(permission: Permission): boolean {
        if (!isArrayWithLength(this.permissions)) {
            return false;
        }

        const result = this.permissions.filter(
            (e) =>
                e.path.toLowerCase() === permission.path.toLowerCase() &&
                e.type === permission.type &&
                e.level !== PermissionLevel.NO_ACCESS &&
                this.compare(e.level, permission.level)
        );

        return result.length > 0;
    }

    private compare(
        userLevel: PermissionLevel | undefined,
        neededLevel: PermissionLevel | undefined
    ): boolean {
        if (!userLevel || !neededLevel) {
            return false;
        }

        switch (userLevel) {
            case PermissionLevel.NO_ACCESS:
                return false;
            case PermissionLevel.READ:
                return [PermissionLevel.READ].includes(neededLevel);
            case PermissionLevel.WRITE:
                return [PermissionLevel.READ, PermissionLevel.WRITE].includes(neededLevel);
            case PermissionLevel.CREATE:
                return [
                    PermissionLevel.READ,
                    PermissionLevel.WRITE,
                    PermissionLevel.CREATE,
                ].includes(neededLevel);
            case PermissionLevel.DELETE:
                return [
                    PermissionLevel.READ,
                    PermissionLevel.WRITE,
                    PermissionLevel.CREATE,
                    PermissionLevel.DELETE,
                ].includes(neededLevel);
            default:
                return false;
        }
    }
}

export default PermissionService;
