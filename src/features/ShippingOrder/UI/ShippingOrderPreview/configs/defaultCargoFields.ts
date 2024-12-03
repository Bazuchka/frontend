import { t } from "i18next";
import { IShippingOrderPreview } from "src/features/ShippingOrder/store/ShippingOrderStore/models/ShippingOrderPreview";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldItem } from "src/shared/UI/iFieldItem/types";

export default function defaultCargoFields(
    data: NonNullable<IShippingOrderPreview["model"]>
): FieldItem[] {
    return [
        {
            label: t("ShippingOrderPreview:properties.goodsCount"),
            name: "totalSKUQuantity",
            type: FieldItemType.INPUT,
            value: data.totalSKUQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ShippingOrderPreview:properties.cargoCount"),
            name: "totalCargoQuantity",
            type: FieldItemType.INPUT,
            value: data.totalCargoQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ShippingOrderPreview:properties.weight"),
            name: "totalWeight",
            type: FieldItemType.INPUT,
            value: data.totalWeight?.toString(),
            readOnly: true,
        },
        {
            label: t("ShippingOrderPreview:properties.palletQuantity"),
            name: "totalPalletQuantity",
            type: FieldItemType.INPUT,
            value: data.totalPalletQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ShippingOrderPreview:properties.notPalletQuantity"),
            name: "totalNotPalletQuantity",
            type: FieldItemType.INPUT,
            value: data.totalNotPalletQuantity?.toString(),
            readOnly: true,
        },
    ];
}
