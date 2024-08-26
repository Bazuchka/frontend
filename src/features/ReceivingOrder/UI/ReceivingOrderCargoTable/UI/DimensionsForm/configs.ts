import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IDimensions } from "../DimensionsLink";

export const fieldsConfiguration = (defaultModel: IDimensions) =>
    [
        {
            fields: [
                {
                    label: t("Dimensions:properties.length"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: defaultModel?.length || "0",
                    name: "length",
                    required: true,
                    fullLine: true,
                },
                {
                    label: t("Dimensions:properties.width"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: defaultModel?.width || "0",
                    name: "width",
                    required: true,
                    fullLine: true,
                },
                {
                    label: t("Dimensions:properties.height"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: defaultModel?.height || "0",
                    name: "height",
                    required: true,
                    fullLine: true,
                },
                {
                    label: t("Dimensions:properties.volume"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: defaultModel?.volume || "0",
                    name: "volume",
                    required: true,
                    fullLine: true,
                },
                {
                    label: t("Dimensions:properties.weight"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.weight || "0",
                    name: "weight",
                    required: true,
                    fullLine: true,
                },
            ],
            name: t("Dimensions:group"),
        },
    ] as FieldGroup[];
