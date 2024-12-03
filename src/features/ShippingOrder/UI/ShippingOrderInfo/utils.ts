import { IShippingOrder } from "../../store/ShippingOrderStore/ShippingOrderStore";

export const getPossibleStatuses = (model: IShippingOrder | null) => {
    if (!model) {
        return ["DRAFT"];
    }

    if (model?.orderStatus === "DRAFT" || model?.orderStatus === "ACCEPTED") {
        return ["DRAFT", "ACCEPTED", "REJECTED"];
    }

    if (model?.orderStatus === "REJECTED") {
        return ["DRAFT", "REJECTED"];
    }

    return [model?.orderStatus];
};

export const isOrderStatusDisabled = (model: IShippingOrder | null) => {
    if (!model || ["IN_PROGRESS", "DONE"].includes(model.orderStatus)) {
        return true;
    }

    return false;
};
