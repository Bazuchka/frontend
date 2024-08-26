export enum DictionaryType {
    CLIENT = 1,
    UNIT_OF_MEASURE = 2,
    CLIENT_GOOD_TYPE = 3,
    GOOD_TYPE = 4,
    BATCH_ACCOUNTING_TYPE = 5,
    SERIAL_ACCOUNTING_TYPE = 6,
    DANGER_CLASS = 7,
    TEMP_REGIME = 8,
    GOOD_PACKAGE_BARCODE = 9,
    IDENTITY_DOCUMENT_TYPE = 10,
    VEHICLE_TYPE = 12,
    VEHICLE_BRAND = 13,
    LOADING_TYPE = 14,
    GOOD_PACKAGE = 15,
    TERMINAL_AREA = 16,
    CONTRACT = 17,
    LEGAL_ENTITY = 18,
    SERVICE = 19,
    FREQUENCY_OF_SERVICES = 20,
    CLIENT_ORDER_TYPE = 21,
    ORDER_STATUS = 22,
    TRANSPORT_TYPE = 23,
    CURRENCY = 24,
    CLIENT_REALTED_ENTITY = 25,
    CLIENT_VEHICLE = 26,
    CLIENT_DRIVER = 27,
    CALCULATION_METHOD = 28,
    TERM_OF_REQUESTED_SERVICE = 29,
    CLIENT_GOOD = 30,
    BATCH = 31,
    PROCESSING_TYPE = 32,
    RECEIVING_ORDER_GOOD = 33,
    GOOD_VARIANT = 35,
    SHIPPING_ORDER_GOOD = 34,
}

export interface DictionaryParams {
    type?: DictionaryType | null;
    urlParams?: Record<string, object | string>;
    filter?:
        | Record<string, object | string | boolean | null>
        | string[]
        | ((value: string) => Record<string, object | string | boolean | null>);
}

export interface IUseAutocompleteDictionary {
    type?: DictionaryType | null;
    filter?:
        | Record<string, object | string | boolean | null>
        | string[]
        | ((value: string) => Record<string, object | string | boolean | null>);
    useSorting?: boolean;
    isMock?: boolean;
}

export interface ProcessingObjectType {
    value: string;
    workflowType: string;
}
