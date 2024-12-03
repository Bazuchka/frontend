import { t } from "i18next";
import railwayCarriageStore from "src/features/RailwayCarriage/store";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { request } from "src/shared/request";

export const fieldsConfiguration = (props?: { client?: { id: string } }) =>
    [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("RailwayCarriage:properties.client"),
                    name: "client",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: props?.client,
                    required: true,
                    isDisable: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("RailwayCarriage:properties.code"),
                    name: "code",
                    type: FieldItemType.INPUT,
                    value: railwayCarriageStore.current?.code,
                    required: true,
                    fullLine: true,
                    validate: async (value) => {
                        const { data } = (await request({
                            method: "POST",
                            data: { code: value },
                            url: `/railwaycarriage/validate`,
                        })) as { data: { valid: boolean } };

                        return data.valid;
                    },
                },
                {
                    label: t("RailwayCarriage:properties.type"),
                    name: "type",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: railwayCarriageStore.current?.type,
                    required: true,
                    isDisable: false,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.RAILWAY_CARRIAGE_TYPE,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("RailwayCarriage:properties.liftingCapacity"),
                    name: "liftingCapacity",
                    type: FieldItemType.INPUT_NUMBER,
                    value: railwayCarriageStore.current?.liftingCapacity || "0",
                    required: true,
                    fullLine: true,
                },
            ],
        },
    ] as FieldGroup[];
