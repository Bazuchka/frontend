import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createColumnHelper } from "@tanstack/react-table";
import { t, TFunction } from "i18next";
import { Controller } from "react-hook-form";
import { PermissionLevel } from "src/shared/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { SelectOfEnum } from "src/shared/UI/SelectOfEnum";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { ITableViewPermission } from "../../store/PermissionStore/PermissionStore";

const getPermissionPrefix = (type: string, t: TFunction): string => {
    switch (type) {
        case "TABLE":
            return t("Permissions:prefix.table");
        case "BUTTON":
            return t("Permissions:prefix.button");
        case "FIELD":
            return t("Permissions:prefix.field");
        case "FORM":
            return t("Permissions:prefix.form");
        default:
            return "";
    }
};

const columnHelper = createColumnHelper<WithGridRowId<ITableViewPermission>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("path", {
            cell: ({ row }) => {
                const prefix = getPermissionPrefix(row.original.type, t);
                const permissionKey = row.original.path.replaceAll(".", "_");
                const translate = t(`Permissions:target.${permissionKey}`);

                const padding = row.original.depth * 25;

                const Icon = row.getIsExpanded() ? KeyboardArrowDownIcon : KeyboardArrowRightIcon;

                return (
                    <>
                        {row.getCanExpand() && (
                            <button
                                {...{
                                    onClick: row.getToggleExpandedHandler(),
                                    style: {
                                        cursor: "pointer",
                                        width: 20,
                                        height: 20,
                                        marginLeft: `${padding}px`,
                                        position: "relative",
                                    },
                                }}>
                                {
                                    <Icon
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                }
                            </button>
                        )}
                        {!row.getCanExpand() && (
                            <span style={{ paddingLeft: `${padding}px` }}></span>
                        )}
                        {`${prefix} ${translate}`}
                    </>
                );
            },
            header: t("Permissions:properties.form"),
            enableSorting: false,
        }),
        columnHelper.accessor("level", {
            cell: (params) => t(`Permissions:types.${params.getValue()}`),
            header: t("Permissions:properties.permission"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="level"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <SelectOfEnum
                                        isDisable={false}
                                        error={invalid}
                                        value={value}
                                        options={Object.values(PermissionLevel)}
                                        onChange={onChange}
                                        translatePath={"Permissions:types"}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
            enableSorting: false,
        }),
    ];
};
