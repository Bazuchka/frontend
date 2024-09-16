import { t } from "i18next";
import { IFullClientVehicle } from "src/features/ClientVehicle/store/ClientVehicleStore";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldOptions, isFieldDisabled } from "src/shared/hooks/useDrawerForm";

export const fieldsConfiguration = (
    defaultModel: IFullClientVehicle | null,
    trailerNumberDisabled: boolean,
    fieldOptions?: FieldOptions
) =>
    [
        {
            fields: [
                {
                    label: t("ClientVehicle:properties.client"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: fieldOptions?.client.value ?? defaultModel?.client,
                    name: "client",
                    required: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                    isDisable: isFieldDisabled(!defaultModel, fieldOptions?.client),
                },
                {
                    label: t("ClientVehicle:properties.code"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.code,
                    name: "code",
                    required: true,
                    fullLine: true,
                    isDisable: isFieldDisabled(!defaultModel, fieldOptions?.code),
                },
                {
                    label: t("ClientVehicle:properties.vehicleType"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.vehicleType,
                    name: "vehicleType",
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.VEHICLE_TYPE,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientVehicle:properties.vehicleBrand"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.vehicleBrand,
                    name: "vehicleBrand",
                    required: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.VEHICLE_BRAND,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientVehicle:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: fieldOptions?.active.value ?? (defaultModel?.active || false),
                    name: "active",
                    fullLine: true,
                    isDisable: isFieldDisabled(!defaultModel, fieldOptions?.active),
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("ClientVehicle:properties.refrigerator"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.refrigerator,
                    name: "refrigerator",
                    fullLine: true,
                },
                {
                    label: t("ClientVehicle:properties.loadingType"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.loadingType,
                    name: "loadingType",
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.LOADING_TYPE,
                        filter: {
                            active: true,
                        },
                    },
                },
            ],
            name: t("ClientVehicle:form.characteristics"),
        },
        {
            fields: [
                {
                    label: t("ClientVehicle:properties.withTrailer"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.withTrailer,
                    name: "withTrailer",
                    fullLine: true,
                },
                {
                    label: t("ClientVehicle:properties.trailerNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.trailerNumber,
                    name: "trailerNumber",
                    fullLine: true,
                    isDisable: trailerNumberDisabled,
                },
            ],
            name: t("ClientVehicle:form.trailer"),
        },
        {
            fields: [
                {
                    label: t("ClientVehicle:properties.insuranceNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.insuranceNumber,
                    name: "insuranceNumber",
                    fullLine: true,
                },
            ],
            name: t("ClientVehicle:form.insurance"),
        },
    ] as FieldGroup[];
