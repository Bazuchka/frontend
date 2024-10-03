import { clientGoods } from "./clientgoods.spec";
import { clients } from "./clients.spec";
import { testI18n } from "./fixtures/i18n.fixture";
import { legalEntities } from "./legalEntities.spec";

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
});

testI18n.describe.serial("Root Dictionaries Depended", async () => {
    testI18n.beforeEach(async ({ page }) => {
        await page.goto("/", {
            waitUntil: "networkidle",
        });
    });
    const sharedData: ISharedData = {};

    clientGoods(sharedData);
});
