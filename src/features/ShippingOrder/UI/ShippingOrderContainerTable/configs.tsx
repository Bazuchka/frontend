import { Checkbox, Grid, SvgIcon, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { CheckIcon, SvgXIcon } from "src/assets/svg";
import { AlisForm, CreateButton, EditButton } from "src/features/common/AlisForm";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { Chips } from "src/shared/UI/Chips";
import { AlisChip } from "src/shared/UI/Chips/Chip";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { containerStore, IContainer } from "../../../Container/store";
import { IShippingOrderRailwayContainer } from "../../store/ShippingOrderContainerStore/ShippingOrderContainerStore";
import { ShippingOrderContainerForm } from "./ShippingOrderContainerForm";

const columnHelper = createColumnHelper<
    WithGridRowId<
        IShippingOrderRailwayContainer & {
            containerType: string;
            refrigerator: boolean;
            weightEmpty: number;
        }
    >
>();

interface ColumnProps {
    clientId: string;
    isRailway: boolean;
    shippingOrderId: string;
}

export const getColumns = ({ clientId, isRailway, shippingOrderId }: ColumnProps) => {
    return [
        isRailway
            ? columnHelper.accessor("railwayCarriage", {
                  cell: (params) => params.getValue()?.code,
                  header: t("ShippingOrderContainer:properties.railwayCarriageId"),
                  size: 240,
                  meta: {
                      editableCell: {
                          component: ({ control }) => {
                              return (
                                  <Controller
                                      name="railwayCarriage"
                                      control={control}
                                      rules={{ required: false }}
                                      render={({
                                          field: { onChange, value },
                                          fieldState: { invalid },
                                      }) => (
                                          <AutocompleteSelectOfDictionary
                                              isDisable={false}
                                              error={invalid}
                                              value={value}
                                              onValueChange={onChange}
                                              useSorting={false}
                                              dictionaryParams={{
                                                  type: DictionaryType.SHIPPING_ORDER_RAILWAY_CARRIAGES,
                                                  filter: {
                                                      active: true,
                                                      deleted: false,
                                                      shippingOrder: {
                                                          id: shippingOrderId,
                                                      },
                                                  },
                                              }}
                                          />
                                      )}
                                  />
                              );
                          },
                          fieldType: FieldItemType.AUTOCOMPLETE,
                      },
                  },
              })
            : null,
        columnHelper.accessor("container", {
            cell: (params) => params.getValue()?.code,
            header: t("ShippingOrderContainer:properties.container"),
            size: 240,
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ row: { getValue, setValue }, control }) => {
                        return (
                            <Controller
                                name="container"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <Grid
                                        container
                                        alignContent="center"
                                        justifyContent="space-between">
                                        <Grid item xs={9}>
                                            <AutocompleteSelectOfDictionary
                                                isDisable={false}
                                                error={invalid}
                                                value={value}
                                                renderValuePrimary="code"
                                                onValueChange={(data) => onChange(data)}
                                                dictionaryParams={{
                                                    type: DictionaryType.CONTAINER,
                                                    filter: {
                                                        active: true,
                                                        client: {
                                                            id: clientId,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <AlisForm
                                                store={containerStore}
                                                createActionComponents={CreateButton}
                                                editActionComponents={EditButton}
                                                allowEdit={getValue("container")?.id}
                                                componentProps={{
                                                    setValue: setValue,
                                                    getValue: getValue,
                                                }}
                                                allowCreate={true}
                                                component={ShippingOrderContainerForm}></AlisForm>
                                        </Grid>
                                    </Grid>
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("sealNumbers", {
            cell: (params) => {
                return (params.getValue() ?? []).map((label, index) => {
                    return <AlisChip label={label} key={index} style={{ marginRight: 3 }} />;
                });
            },
            header: t("ShippingOrderContainer:properties.sealNumbers"),
            size: 400,
            meta: {
                editableCell: {
                    component: ({ control }) => (
                        <Controller
                            name="sealNumbers"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState: { invalid } }) => (
                                <Chips {...field} invalid={invalid} />
                            )}
                        />
                    ),
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("empty", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                } else {
                    return <SvgXIcon />;
                }
            },
            header: t("ShippingOrderContainer:properties.empty"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("empty")}
                                error={!!error}
                                defaultChecked={row.original.empty}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("weight", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderContainer:properties.weight"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("weight", { required: true })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("customsClearance", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                } else {
                    return <SvgXIcon />;
                }
            },
            header: t("ShippingOrderContainer:properties.customsClearance"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("customsClearance")}
                                error={!!error}
                                defaultChecked={row.original.customsClearance}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("dangerousCargo", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                } else {
                    return <SvgXIcon />;
                }
            },
            header: t("ShippingOrderContainer:properties.dangerousCargo"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("dangerousCargo")}
                                error={!!error}
                                defaultChecked={row.original.dangerousCargo}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("containerType", {
            cell: ({ row }) =>
                (row.getValue("container") as IContainer)?.containerType
                    ? t(
                          "ContainerType:types." +
                              (row.getValue("container") as IContainer).containerType
                      )
                    : "",
            header: t("ShippingOrderContainer:properties.containerType"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("refrigerator", {
            cell: ({ row }) => {
                if ((row.getValue("container") as IContainer)?.refrigerator) {
                    return <SvgIcon component={CheckIcon} />;
                } else if ((row.getValue("container") as IContainer)?.refrigerator === false) {
                    return <SvgXIcon />;
                }
            },
            header: t("ShippingOrderContainer:properties.refrigerator"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("weightEmpty", {
            cell: ({ row }) => (row.getValue("container") as IContainer)?.weight,
            header: t("ShippingOrderContainer:properties.weightEmpty"),
            meta: {
                isComputed: true,
            },
        }),
    ].filter((e) => e !== null);
};
