export enum OrderType {
    containerVehicle,
    containerRailway,
    warehouseVehicle,
}

export const getOrderType = ({
    terminalArea,
    transportType,
}: {
    terminalArea: string;
    transportType: string;
}): OrderType => {
    if (terminalArea === "WAREHOUSE") {
        return OrderType.warehouseVehicle;
    }

    if (transportType === "RAILWAY") {
        return OrderType.containerRailway;
    }
    return OrderType.containerVehicle;
};
