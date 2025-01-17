import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const backendOptions: HttpBackendOptions = {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
};

const isDev = process.env.NODE_ENV === "development";
const isDebugMode = false;
const defaultLanguage = "ru";

const ns = [
    "Action",
    "Dialog",
    "Client",
    "Languages",
    "Shared",
    "LegalEntity",
    "Contract",
    "ContractType",
    "Service",
    "ClientGoodType",
    "ClientGood",
    "ClientDriver",
    "ServerErrorTypes",
    "GoodPackage",
    "GoodPackageBarcode",
    "ClientVehicle",
    "UnitOfMeasure",
    "BatchAccounting",
    "IdentityDocument",
    "TermOfService",
    "TerminalArea",
    "AccrualBase",
    "Reports",
    "AccrualMethod",
    "TermOfPeriodicService",
    "TermOfRequestedService",
    "ClientOrderType",
    "ReceivingOrder",
    "ShippingOrder",
    "TransportType",
    "OrderStatus",
    "SerialAccounting",
    "CalculationMethod",
    "ReceivingOrderTransport",
    "ReceivingOrderGood",
    "ReceivingOrderBatch",
    "ReceivingOrderRequestedService",
    "ReceivingOrderCargo",
    "ReceivingOrderPreview",
    "ProcessingType",
    "ShippingOrderTransport",
    "ShippingOrderGood",
    "GoodVariant",
    "Dimensions",
    "ShippingOrderRequestedService",
    "ShippingOrderCargo",
    "ShippingOrderPreview",
    "Container",
    "Containers",
    "ReceivingOrderContainer",
    "ContainerType",
    "ReceivingOrderContainerItem",
    "User",
    "ShippingOrderContainerItem",
    "ShippingOrderContainer",
    "ShippingOrderEtranInvoice",
    "EtranInvoice",
    "ReceivingOrderEtranInvoice",
    "Role",
    "ShippingOrderRailwayCarriage",
    "RailwayCarriage",
    "ReceivingOrderRailwayCarriage",
    "Permissions",
    "Remains",
];

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        lng: localStorage.getItem("i18nextLng") || defaultLanguage,
        backend: backendOptions,
        debug: isDev && isDebugMode,
        react: {
            useSuspense: true,
        },
        ns,
    })
    .catch((error) => console.log(error));

export default i18n;
