export enum PermissionLevel {
    NO_ACCESS = "NO_ACCESS",
    READ = "READ",
    CREATE = "CREATE",
    WRITE = "WRITE",
    DELETE = "DELETE",
}

export enum PermissionType {
    FORM = "FORM",
    TABLE = "TABLE",
    BUTTON = "BUTTON",
}

export interface Permission {
    path: string;
    type?: PermissionType;
    level?: PermissionLevel;
}
