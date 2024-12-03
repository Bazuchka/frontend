import { FieldItemType } from "../common/form";
import {
    BATCH,
    CLIENT_DRIVER,
    CLIENT_GOOD,
    CLIENT_RELATED_ENTITY,
    CLIENT_TEST_NAME,
    CLIENT_VEHICLE,
    CONTRACT_TEST_NAME,
    GOOD_VARIANT,
    LEGAL_ENTITY_TEST_NAME,
    RECEIVING_ORDER_VEHICLE_CONTAINER,
    RECEIVING_ORDER_VEHICLE_WAREHOUSE,
} from "../const";

export const CREATE_MAIN_INFO_FIELDS = [
    {
        name: "client",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_TEST_NAME,
    },
    {
        name: "legalEntity",
        type: FieldItemType.AUTOCOMPLETE,
        value: LEGAL_ENTITY_TEST_NAME,
    },
    {
        name: "contract",
        type: FieldItemType.AUTOCOMPLETE,
        value: CONTRACT_TEST_NAME,
    },
    {
        name: "planReceivingDate",
        type: FieldItemType.DATE,
        value: RECEIVING_ORDER_VEHICLE_CONTAINER.planReceivingDate,
    },
    {
        name: "planReceivingTime",
        type: FieldItemType.TIME,
        value: RECEIVING_ORDER_VEHICLE_CONTAINER.planReceivingTime,
    },
    {
        name: "currency",
        type: FieldItemType.AUTOCOMPLETE,
    },
];

export const CREATE_VEHICLE_CONTAINER = (t: (term: string) => string) => [
    ...CREATE_MAIN_INFO_FIELDS,
    {
        name: "terminalArea",
        type: FieldItemType.SELECT,
        value: t(`TerminalArea:types.${RECEIVING_ORDER_VEHICLE_CONTAINER.terminalArea}`),
    },
    {
        name: "transportType",
        type: FieldItemType.SELECT,
        value: t(`TransportType:types.${RECEIVING_ORDER_VEHICLE_CONTAINER.transportType}`),
    },
];

export const CREATE_VEHICLE_WAREHOUSE = (t: (term: string) => string) => [
    ...CREATE_MAIN_INFO_FIELDS,
    {
        name: "terminalArea",
        type: FieldItemType.SELECT,
        value: t(`TerminalArea:types.${RECEIVING_ORDER_VEHICLE_WAREHOUSE.terminalArea}`),
    },
    {
        name: "transportType",
        type: FieldItemType.SELECT,
        value: t(`TransportType:types.${RECEIVING_ORDER_VEHICLE_WAREHOUSE.transportType}`),
    },
];

export const ASSIGN_GOODS_WAREHOUSE = [
    {
        name: "clientGood",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_GOOD.item,
    },
    {
        name: "goodVariant",
        type: FieldItemType.AUTOCOMPLETE,
        value: GOOD_VARIANT.code,
    },
    {
        name: "batch",
        type: FieldItemType.AUTOCOMPLETE,
        value: BATCH.name,
    },
    {
        name: "plannedQuantity",
        type: FieldItemType.INPUT_NUMBER,
        value: "10",
    },
];

export const CREATE_TRANSPORT_FIELDS = [
    {
        name: "shipper",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_RELATED_ENTITY.code,
    },
    {
        name: "waybill",
        type: FieldItemType.INPUT,
        value: "1234567890",
    },
    {
        name: "carrier",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_RELATED_ENTITY.code,
    },
    {
        name: "vehicle",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_VEHICLE.code,
    },
    {
        name: "driver",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_DRIVER.code,
    },
];

export const ASSIGN_CONTAINER_FIELDS = (container) => [
    {
        name: "container",
        type: FieldItemType.AUTOCOMPLETE,
        value: container,
    },
    {
        name: "sealNumbers",
        type: FieldItemType.CHIPS,
        value: ["test"],
    },
    {
        name: "weight",
        type: FieldItemType.INPUT_NUMBER,
        value: "10",
    },
];

export const ASSIGN_GOODS_IN_CONTAINER_FIELDS = (container) => [
    {
        name: "receivingOrderContainer",
        type: FieldItemType.AUTOCOMPLETE,
        value: container,
    },
    {
        name: "etsngCode",
        type: FieldItemType.AUTOCOMPLETE,
    },
    {
        name: "description",
        type: FieldItemType.INPUT,
        value: "TEST DESCRIPTION",
    },
    {
        name: "price",
        type: FieldItemType.INPUT_NUMBER,
        value: "10",
    },
];

export const CREATE_CONTAINER_FIELDS = (t: (term: string) => string) => [
    {
        name: "code",
        type: FieldItemType.INPUT,
        value: generateRandomContainerCode(),
    },
    {
        name: "containerType",
        type: FieldItemType.SELECT,
        value: t("ContainerType:types.STANDARD_20"),
    },
    {
        name: "weight",
        type: FieldItemType.INPUT_NUMBER,
        value: "10",
    },
];

export const CREATE_BATCH_FIELDS = [
    {
        name: "name",
        type: FieldItemType.INPUT,
        value: BATCH.name,
    },
    {
        name: "manufactureDate",
        type: FieldItemType.DATE,
        value: BATCH.manufactureDate,
    },
];

export const generateRandomContainerCode = (): string => {
    const ownerCode = "AUT";

    const categoryIdentifier = "U";

    const letterToNumberic: Record<string, number> = {
        A: 10,
        B: 12,
        C: 13,
        D: 14,
        E: 15,
        F: 16,
        G: 17,
        H: 18,
        I: 19,
        J: 20,
        K: 21,
        L: 23,
        M: 24,
        N: 25,
        O: 26,
        P: 27,
        Q: 28,
        R: 29,
        S: 30,
        T: 31,
        U: 32,
        V: 34,
        W: 35,
        X: 36,
        Y: 37,
        Z: 38,
    };

    const serialNumber = Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10))
        .join("");

    const calculateCheckDigit = (containerCode: string): string => {
        const weights = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        let sum = 0;

        for (let i = 0; i < containerCode.length; i++) {
            const char = containerCode[i];
            const value =
                letterToNumberic[char] === undefined ? parseInt(char, 10) : letterToNumberic[char];
            sum += value * weights[i];
        }

        return ((sum % 11) % 10).toString();
    };

    const containerCode = `${ownerCode}${categoryIdentifier}${serialNumber}`;
    const checkDigit = calculateCheckDigit(containerCode);

    return `${containerCode}${checkDigit}`;
};
