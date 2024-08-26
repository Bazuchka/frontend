import { FieldValues } from "react-hook-form";
import { IFullReceivingOrderTransport } from "../../store/ReceivingOrderTransportStore/ReceivingOrderTransportStore";

export const mapFormToCreateDTO = (
    receivingOrderId: string,
    data: FieldValues
): IFullReceivingOrderTransport => {
    return {
        receivingOrder: {
            id: receivingOrderId,
            code: undefined as unknown as string,
        },
        shipper: data.shipper,
        carrier: data.carrier,
        waybill: data.waybill,
        vehicleInfo: {
            id: data.vehicle.id,
            code: data.vehicle.code,
            withTrailer: data.withTrailer,
            trailerNumber: data.vehicleTrailerNumber,
            insuranceNumber: data.vehicleInsuranceNumber,
        },
        driverInfo: {
            id: data.driver.id,
            code: data.driver.code,
            phoneNumber: data.driverPhoneNumber,
            POANumber: data.driverPOANumber,
        },
    } as IFullReceivingOrderTransport;
};

export const mapFormToUpdateDTO = (
    id: string,
    receivingOrderId: string,
    data: FieldValues
): IFullReceivingOrderTransport => {
    return {
        id,
        receivingOrder: {
            id: receivingOrderId,
            code: undefined as unknown as string,
        },
        shipper: data.shipper,
        carrier: data.carrier,
        waybill: data.waybill,
        vehicleInfo: {
            id: data.vehicle.id,
            code: data.vehicle.code,
            withTrailer: data.withTrailer,
            trailerNumber: data.vehicleTrailerNumber,
            insuranceNumber: data.vehicleInsuranceNumber,
        },
        driverInfo: {
            id: data.driver.id,
            code: data.driver.code,
            phoneNumber: data.driverPhoneNumber,
            POANumber: data.driverPOANumber,
        },
    } as IFullReceivingOrderTransport;
};
