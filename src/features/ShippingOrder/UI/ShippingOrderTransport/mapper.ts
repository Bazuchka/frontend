import { FieldValues } from "react-hook-form";
import { IFullShippingOrderTransport } from "../../store/ShippingOrderTransportStore/ShippingOrderTransportStore";

export const mapFormToCreateDTO = (
    shippingOrderId: string,
    data: FieldValues
): IFullShippingOrderTransport => {
    return {
        shippingOrder: {
            id: shippingOrderId,
            code: undefined as unknown as string,
        },
        consignee: data.consignee,
        consigneeAddress: data.consigneeAddress,
        carrier: data.carrier,
        withTrailer: data.withTrailer ?? false,
        vehicleInfo: {
            id: data.vehicle.id,
            code: data.vehicle.code,
            withTrailer: data.withTrailer,
            insuranceNumber: data.vehicleInsuranceNumber,
            trailerNumber: data.vehicleTrailerNumber,
        },
        driverInfo: {
            id: data.driver.id,
            code: data.driver.code,
            phoneNumber: data.driverPhoneNumber,
            POANumber: data.driverPOANumber,
        },
    } as IFullShippingOrderTransport;
};

export const mapFormToUpdateDTO = (
    id: string,
    receivingOrderId: string,
    data: FieldValues
): IFullShippingOrderTransport => {
    return {
        id,
        shippingOrder: {
            id: receivingOrderId,
            code: undefined as unknown as string,
        },
        consignee: data.consignee,
        consigneeAddress: data.consigneeAddress,
        withTrailer: data.withTrailer ?? false,
        carrier: data.carrier,
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
    } as IFullShippingOrderTransport;
};
