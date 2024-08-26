import { FieldValues } from "react-hook-form";
import { composeDateTimeWithoutTimeZone } from "src/shared/helpers";
import { v4 as uuidv4 } from "uuid";
import { IFullShippingOrder } from "../../store/ShippingOrderStore/ShippingOrderStore";

export const mapFormToCreateDTO = (data: FieldValues): IFullShippingOrder => {
    return {
        client: data.client,
        code: data.client.code,
        currency: data.currency,
        legalEntity: data.legalEntity,
        orderStatus: "DRAFT",
        terminalArea: data.terminalArea,
        transportType: data.transportType,
        contract: data.contract,
        comment: data.comment,
        contact: {
            email: data.contactEmail,
            name: data.contactName,
            phone: data.contactPhone,
        },
        plannedShippingDateTime: composeDateTimeWithoutTimeZone(
            data.planShippingDate,
            data.planShippingTime
        ),
        syncId: uuidv4(),
    } as IFullShippingOrder;
};

export const mapFormToUpdateDTO = (id: string, data: FieldValues): IFullShippingOrder => {
    return {
        id,
        client: data.client,
        code: data.client.code,
        currency: data.currency,
        legalEntity: data.legalEntity,
        orderStatus: data.orderStatus,
        terminalArea: data.terminalArea,
        transportType: data.transportType,
        contract: data.contract,
        comment: data.comment,
        contact: {
            email: data.contactEmail,
            name: data.contactName,
            phone: data.contactPhone,
        },
        plannedShippingDateTime: composeDateTimeWithoutTimeZone(
            data.planShippingDate,
            data.planShippingTime
        ),
    } as IFullShippingOrder;
};
