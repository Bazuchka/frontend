import { test as base } from "@playwright/test";
import Backend from "i18next-http-backend";
import { createI18nFixture } from "playwright-i18next-fixture";

const i18nFixture = createI18nFixture({
    plugins: [Backend],
    // i18n configuration options
    options: {
        debug: false,
        ns: [
            "Action",
            "Dialog",
            "Client",
            "Languages",
            "Shared",
            "LegalEntity",
            "Contract",
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
        ],
        lng: "ru",
        cleanCode: true,
        backend: {
            loadPath: "http://localhost:3000/locales/{{lng}}/{{ns}}.json", // TODO use env param
        },
    },
    // Fetch translations in every test or fetch once
    // Default: true
    cache: true,
    // Run as auto fixture to be available through all tests by getI18nInstance()
    // Default: true
    auto: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const testI18n = base.extend(i18nFixture).extend<{ i18nFix: any }>({
    i18nFix: async ({ i18n }, use) => {
        await use(i18n);
    },
});
