import { t } from "i18next";
import { IReceivingOrderPreview } from "src/features/ReceivingOrder/store/ReceivingOrderStore/models/ReceivingOrderPreview";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldItem } from "src/shared/UI/iFieldItem/types";

export default function defaultCargoFields(
    data: NonNullable<IReceivingOrderPreview["model"]>
): FieldItem[] {
    return [
        {
            label: t("ReceivingOrderPreview:properties.goodsCount"),
            name: "totalSKUQuantity",
            type: FieldItemType.INPUT,
            value: data.totalSKUQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ReceivingOrderPreview:properties.cargoCount"),
            name: "totalCargoQuantity",
            type: FieldItemType.INPUT,
            value: data.totalCargoQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ReceivingOrderPreview:properties.weight"),
            name: "totalWeight",
            type: FieldItemType.INPUT,
            value: data.totalWeight?.toString(),
            readOnly: true,
        },
        {
            label: t("ReceivingOrderPreview:properties.palletQuantity"),
            name: "totalPalletQuantity",
            type: FieldItemType.INPUT,
            value: data.totalPalletQuantity?.toString(),
            readOnly: true,
        },
        {
            label: t("ReceivingOrderPreview:properties.notPalletQuantity"),
            name: "totalNotPalletQuantity",
            type: FieldItemType.INPUT,
            value: data.totalNotPalletQuantity?.toString(),
            readOnly: true,
        },
    ];
}
