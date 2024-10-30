import { Checkbox, Grid, SvgIcon, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { CheckIcon, SvgXIcon } from "src/assets/svg";
import { AlisForm, CreateButton, EditButton } from "src/features/common/AlisForm";
import { ControlledAutoComplete } from "src/features/common/ControlledAutocomplete";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { Chips } from "src/shared/UI/Chips";
import { AlisChip } from "src/shared/UI/Chips/Chip";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { containerStore, IContainer } from "../../../Container/store";
import { IReceivingOrderRailwayContainer } from "../../store/ReceivingOrderContainerStore";
import { ReceivingOrderContainerForm } from "./ReceivingOrderContainerForm";

const columnHelper = createColumnHelper<
    WithGridRowId<
        IReceivingOrderRailwayContainer & {
            containerType: string;
            refrigerator: boolean;
            weightEmpty: number;
        }
    >
>();

interface ColumnProps {
    clientId: string;
    isRailway: boolean;
    receivingOrderId: string;
}

export const getColumns = ({ clientId, isRailway, receivingOrderId }: ColumnProps) => {
    return [
        isRailway
            ? columnHelper.accessor("receivingOrderRailwayCarriage", {
                  cell: (params) => params.getValue()?.code,
                  header: t("ReceivingOrderContainer:properties.railwayCarriageId"),
                  size: 240,
                  meta: {
                      editableCell: {
                          component: ({ control }) => (
                              <ControlledAutoComplete
                                  name="receivingOrderRailwayCarriage"
                                  control={control}
                                  rules={{ required: true }}
                                  autoCompleteProps={{
                                      useDefaultFilter: false,
                                      useSorting: false,
                                      dictionaryParams: {
                                          type: DictionaryType.RECEIVING_ORDER_RAILWAY_CARRIAGES,
                                          filter: (value: string) => ({
                                              active: true,
                                              deleted: false,
                                              receivingOrder: {
                                                  id: receivingOrderId,
                                              },
                                              railwayCarriage: {
                                                  code: {
                                                      type: SEARCH_TYPE.CONTAINS,
                                                      content: value,
                                                      byOr: true,
                                                  },
                                              },
                                          }),
                                      },
                                  }}
                              />
                          ),
                          fieldType: FieldItemType.AUTOCOMPLETE,
                      },
                  },
              })
            : null,
        columnHelper.accessor("container", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderContainer:properties.container"),
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
                                        <Grid item xs={8}>
                                            <AutocompleteSelectOfDictionary
                                                isDisable={false}
                                                error={invalid}
                                                value={value}
                                                renderValuePrimary="code"
                                                fieldName="container"
                                                onValueChange={(data) => onChange(data)}
                                                dictionaryParams={{
                                                    type: DictionaryType.CONTAINER,
                                                    filter: {
                                                        active: true,
                                                        client: {
                                                            id: clientId,
                                                        },
                                                        notUsedInReceivingOrder: receivingOrderId,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <AlisForm
                                                id={getValue("container")?.id}
                                                store={containerStore}
                                                allowEdit={getValue("container")?.id}
                                                createActionComponents={CreateButton}
                                                editActionComponents={EditButton}
                                                componentProps={{
                                                    setValue: setValue,
                                                    getValue: getValue,
                                                }}
                                                allowCreate={true}
                                                component={ReceivingOrderContainerForm}></AlisForm>
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
            header: t("ReceivingOrderContainer:properties.sealNumbers"),
            size: 400,
            meta: {
                editableCell: {
                    component: ({ control }) => (
                        <Controller
                            name="sealNumbers"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState: { invalid } }) => (
                                <Chips {...field} invalid={invalid} testName="sealNumbers" />
                            )}
                        />
                    ),
                    fieldType: FieldItemType.AUTOCOMPLETE, // TODO Add Chips field type
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
            header: t("ReceivingOrderContainer:properties.empty"),
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
            header: t("ReceivingOrderContainer:properties.weight"),
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
                                data-test-id={"value:weight"}
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
            header: t("ReceivingOrderContainer:properties.customsClearance"),
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
            header: t("ReceivingOrderContainer:properties.dangerousCargo"),
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
            header: t("ReceivingOrderContainer:properties.containerType"),
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
            header: t("ReceivingOrderContainer:properties.refrigerator"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("weightEmpty", {
            cell: ({ row }) => (row.getValue("container") as IContainer)?.weight,
            header: t("ReceivingOrderContainer:properties.weightEmpty"),
            meta: {
                isComputed: true,
            },
        }),
    ].filter((e) => e !== null);
};
