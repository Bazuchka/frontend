import dictionaryStore from "src/shared/store/DictionaryStore";
import { DictionaryParams, DictionaryType } from "./types";

export interface ValueOption {
    value: string;
}

export const enumsConfig = (params: DictionaryParams): string[] | ValueOption[] => {
    switch (params.type) {
        case DictionaryType.BATCH_ACCOUNTING_TYPE:
            return dictionaryStore.batchAccountingType;
        case DictionaryType.SERIAL_ACCOUNTING_TYPE:
            return dictionaryStore.serialAccountingType;
        case DictionaryType.IDENTITY_DOCUMENT_TYPE:
            return dictionaryStore.identityDocumentType;
        case DictionaryType.TERMINAL_AREA:
            return dictionaryStore.terminalArea;
        case DictionaryType.CLIENT_ORDER_TYPE:
            return dictionaryStore.clientOrderType;
        case DictionaryType.ORDER_STATUS:
            return dictionaryStore.orderStatus;
        case DictionaryType.TRANSPORT_TYPE:
            return dictionaryStore.transportType;
        case DictionaryType.CALCULATION_METHOD:
            return dictionaryStore.calculationMethod;
        case DictionaryType.PROCESSING_TYPE:
            return dictionaryStore.processingType;
        case DictionaryType.CONTAINER_TYPE:
            return dictionaryStore.containerType;
        case DictionaryType.USERTYPE:
            return dictionaryStore.userType;
        default:
            return [];
    }
};
