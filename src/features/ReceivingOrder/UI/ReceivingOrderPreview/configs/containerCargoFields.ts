import { t } from "i18next";
import { IReceivingOrderPreview } from "src/features/ReceivingOrder/store/ReceivingOrderStore/models/ReceivingOrderPreview";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldItem } from "src/shared/UI/iFieldItem/types";

export default function containerCargoFields(
    data: NonNullable<IReceivingOrderPreview["model"]>
): FieldItem[] {
    return [
        {
            label: t("ReceivingOrderPreview:properties.containersQuantity"),
            name: "containersQuantity",
            type: FieldItemType.INPUT,
            value: data.totalContainerQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ReceivingOrderPreview:properties.weight"),
            name: "totalWeight",
            type: FieldItemType.INPUT,
            value: data.totalWeight?.toString(),
            readOnly: true,
        },
    ];
}
