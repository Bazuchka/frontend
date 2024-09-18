import { IFullReceivingOrder } from "../../store/ReceivingOrderStore/ReceivingOrderStore";

export const getPossibleStatuses = (model: IFullReceivingOrder | null) => {
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

export const isOrderStatusDisabled = (model: IFullReceivingOrder | null) => {
    if (!model || ["IN_PROGRESS", "DONE"].includes(model.orderStatus)) {
        return true;
    }

    return false;
};
