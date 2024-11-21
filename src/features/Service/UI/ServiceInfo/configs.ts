import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import serviceStore from "../../store";

export const fieldsConfiguration = () =>
    [
        {
            fields: [
                {
                    label: t("Service:properties.code"),
                    type: FieldItemType.INPUT,
                    value: serviceStore.current?.code,
                    name: "code",
                    fullLine: false,
                },
                {
                    label: t("Service:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: serviceStore.current?.active,
                    name: "active",
                    fullLine: false,
                },
                {
                    label: t("Service:properties.terminalArea"),
                    type: FieldItemType.INPUT,
                    value: serviceStore.current?.terminalArea
                        ? t(`TerminalArea:types.${serviceStore.current.terminalArea}`)
                        : "-",
                    name: "terminalArea",
                    fullLine: false,
                },
                {
                    label: t("Service:properties.unitOfMeasure"),
                    type: FieldItemType.INPUT,
                    value: serviceStore.current?.unitOfMeasure?.code ?? "-",
                    name: "unitOfMeasure",
                    fullLine: false,
                },
                {
                    label: t("Service:properties.name"),
                    type: FieldItemType.INPUT,
                    value: serviceStore.current?.name ?? "-",
                    name: "name",
                    fullLine: true,
                },
                {
                    label: t("Service:properties.instruction"),
                    type: FieldItemType.INPUT,
                    value: serviceStore.current?.instruction ?? "-",
                    name: "instruction",
                    fullLine: true,
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("Service:properties.accrualMethod"),
                    type: FieldItemType.ENUM_SELECT,
                    value: serviceStore.current?.accrualMethod,
                    name: "accrualMethod",
                    translatePath: "AccrualMethod:types",
                    fullLine: false,
                },
                {
                    label: t("Service:properties.accrualBase"),
                    type: FieldItemType.ENUM_SELECT,
                    value: serviceStore.current?.accrualBase,
                    name: "accrualBase",
                    translatePath: "AccrualBase:types",
                    fullLine: false,
                },
            ],
            name: t("Service:properties.billingParams"),
        },
    ] as FieldGroup[];
