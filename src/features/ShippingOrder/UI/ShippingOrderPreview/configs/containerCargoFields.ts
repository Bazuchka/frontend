import { t } from "i18next";
import { IShippingOrderPreview } from "src/features/ShippingOrder/store/ShippingOrderStore/models/ShippingOrderPreview";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldItem } from "src/shared/UI/iFieldItem/types";

export default function containerCargoFields(
    data: NonNullable<IShippingOrderPreview["model"]>
): FieldItem[] {
    return [
        {
            label: t("ShippingOrderPreview:properties.containersQuantity"),
            name: "containersQuantity",
            type: FieldItemType.INPUT,
            value: data.totalContainerQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ReceivingOrderPreview:properties.weight_container"),
            name: "totalWeight",
            type: FieldItemType.INPUT,
            value: data.totalWeight?.toString(),
            readOnly: true,
        },
    ];
}
