import { FieldItemType } from "../common/form";
import {
    CLIENT_DRIVER,
    CLIENT_RELATED_ENTITY,
    CLIENT_TEST_NAME,
    CLIENT_VEHICLE,
    CONTRACT_TEST_NAME,
    LEGAL_ENTITY_TEST_NAME,
    SHIPPING_ORDER_VEHICLE_CONTAINER,
} from "../const";

export const CREATE_MAIN_INFO_FIELDS = (t: (term: string) => string) => [
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
        name: "planShippingDate",
        type: FieldItemType.DATE,
        value: SHIPPING_ORDER_VEHICLE_CONTAINER.planShippingDate,
    },
    {
        name: "planShippingTime",
        type: FieldItemType.TIME,
        value: SHIPPING_ORDER_VEHICLE_CONTAINER.planShippingTime,
    },
    {
        name: "terminalArea",
        type: FieldItemType.SELECT,
        value: t(`TerminalArea:types.${SHIPPING_ORDER_VEHICLE_CONTAINER.terminalArea}`),
    },
    {
        name: "transportType",
        type: FieldItemType.SELECT,
        value: t(`TransportType:types.${SHIPPING_ORDER_VEHICLE_CONTAINER.transportType}`),
    },
    {
        name: "currency",
        type: FieldItemType.AUTOCOMPLETE,
    },
];

export const CREATE_TRANSPORT_FIELDS = [
    {
        name: "consignee",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_RELATED_ENTITY.code,
    },
    {
        name: "consigneeAddress",
        type: FieldItemType.INPUT,
        value: "TEST ADDRESS",
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
        name: "shippingOrderContainer",
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
