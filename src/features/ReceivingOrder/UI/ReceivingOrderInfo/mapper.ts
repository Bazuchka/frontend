import { FieldValues } from "react-hook-form";
import { composeDateTimeWithoutTimeZone } from "src/shared/helpers";
import { v4 as uuidv4 } from "uuid";
import { IFullReceivingOrder } from "../../store/ReceivingOrderStore/ReceivingOrderStore";

export const mapFormToCreateDTO = (data: FieldValues): IFullReceivingOrder => {
    return {
        client: data.client,
        code: data.client.code,
        currency: data.currency,
        legalEntity: data.legalEntity,
        orderStatus: "DRAFT",
        terminalArea: data.terminalArea,
        transportType: data.transportType,
        storagePeriod: data.storagePeriod,
        contract: data.contract,
        comment: data.comment,
        contact: {
            email: data.contactEmail,
            name: data.contactName,
            phone: data.contactPhone,
        },
        planReceivingDateTime: composeDateTimeWithoutTimeZone(
            data.planReceivingDate,
            data.planReceivingTime
        ),
        syncId: uuidv4(),
    } as IFullReceivingOrder;
};

export const mapFormToUpdateDTO = (id: string, data: FieldValues): IFullReceivingOrder => {
    return {
        id,
        client: data.client,
        code: data.client.code,
        currency: data.currency,
        legalEntity: data.legalEntity,
        orderStatus: data.orderStatus,
        terminalArea: data.terminalArea,
        transportType: data.transportType,
        storagePeriod: data.storagePeriod,
        contract: data.contract,
        comment: data.comment,
        contact: {
            email: data.contactEmail,
            name: data.contactName,
            phone: data.contactPhone,
        },
        planReceivingDateTime: composeDateTimeWithoutTimeZone(
            data.planReceivingDate,
            data.planReceivingTime
        ),
    } as IFullReceivingOrder;
};
