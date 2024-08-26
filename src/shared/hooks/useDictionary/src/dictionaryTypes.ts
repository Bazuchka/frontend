import { DictionaryType } from "../types";

export const dictionaryTypeToUrl = () // _urlParams: Record<string, string | object> | undefined
: Record<string, string> => {
    return {
        [DictionaryType.CLIENT]: `/client/all`,
        [DictionaryType.CLIENT_GOOD_TYPE]: `/clientgoodtype/all`,
        [DictionaryType.UNIT_OF_MEASURE]: `/unitofmeasure/all`,
        [DictionaryType.GOOD_TYPE]: `/goodtype/all`,
        [DictionaryType.DANGER_CLASS]: `/dangerclass/all`,
        [DictionaryType.TEMP_REGIME]: `/tempregime/all`,
        [DictionaryType.GOOD_PACKAGE_BARCODE]: `/goodpackagebarcode/all`,
        [DictionaryType.GOOD_PACKAGE]: `/goodpackage/all`,
        [DictionaryType.VEHICLE_BRAND]: `/vehiclebrand/all`,
        [DictionaryType.VEHICLE_TYPE]: `/vehicletype/all`,
        [DictionaryType.LOADING_TYPE]: `/loadingtype/all`,
        [DictionaryType.CONTRACT]: `/contract/all`,
        [DictionaryType.LEGAL_ENTITY]: `/legalentity/all`,
        [DictionaryType.SERVICE]: `/service/all`,
        [DictionaryType.FREQUENCY_OF_SERVICES]: `/frequencyofservices/all`,
        [DictionaryType.CURRENCY]: `/currency/all`,
        [DictionaryType.CLIENT_REALTED_ENTITY]: `/clientrelatedentity/all`,
        [DictionaryType.CLIENT_VEHICLE]: `/clientvehicle/all`,
        [DictionaryType.CLIENT_DRIVER]: `/clientdriver/all`,
        [DictionaryType.CALCULATION_METHOD]: `/calculationmethod/all`,
        [DictionaryType.TERM_OF_REQUESTED_SERVICE]: `/termofrequestedservice/all`,
        [DictionaryType.CLIENT_GOOD]: `/clientgood/all`,
        [DictionaryType.GOOD_VARIANT]: `/goodvariant/all`,
        [DictionaryType.BATCH]: `/batch/all`,
        [DictionaryType.RECEIVING_ORDER_GOOD]: `/receivingordergood/all`,
        [DictionaryType.SHIPPING_ORDER_GOOD]: `/shippingordergood/all`,
    };
};
