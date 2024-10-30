import { clientGoods } from "./clientgoods.spec";
import { clients } from "./clients.spec";
import { drivers } from "./drivers.spec";
import { testI18n } from "./fixtures/i18n.fixture";
import { legalEntities } from "./legalEntities.spec";
import { receivingOrderVehicleContainer } from "./receivingOrder/receivingOrderVehicleContainer.spec";
import { receivingOrderVehicleWarehouse } from "./receivingOrder/receivingOrderVehicleWarehouse.spec";
import { services } from "./service.spec";
import { shippingOrderVehicleContainer } from "./shippingOrder/shippingOrderVehicleContainer.spec";
import { unitOfMeasure } from "./unitOfMeadure.spec";
import { vehicles } from "./vehicle.spec";

export interface ISharedData {
    clientGood?: string;
}

testI18n.describe("Root Dictionaries Independed", async () => {
    testI18n.beforeEach(async ({ page }) => {
        await page.goto("/", {
            waitUntil: "networkidle",
        });
    });

    clients();
    legalEntities();
    services();
    unitOfMeasure();
    drivers();
    vehicles();
});

testI18n.describe.serial("Root Dictionaries Depended", async () => {
    testI18n.beforeEach(async ({ page }) => {
        await page.goto("/", {
            waitUntil: "networkidle",
        });
    });
    const sharedData: ISharedData = {};

    // Uncoment when it runs in docker
    // clientGoodTypes();
    // clientGoods(sharedData); // as example
    // clientRelatedEntity();
    clientGoods(sharedData);
});

testI18n.describe("Orders", async () => {
    testI18n.beforeEach(async ({ page }) => {
        await page.goto("/", {
            waitUntil: "networkidle",
        });
    });

    receivingOrderVehicleContainer();
    receivingOrderVehicleWarehouse();
    shippingOrderVehicleContainer();
});
