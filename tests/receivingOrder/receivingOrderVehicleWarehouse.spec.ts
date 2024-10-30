import { expect } from "@playwright/test";
import { populateForm } from "../common/form";
import { hasHeaderAndBreadcrumbsStep } from "../common/headerCheck";
import { loadScene } from "../common/scene";
import { testI18n } from "../fixtures/i18n.fixture";
import { CREATE_TRANSPORT_FIELDS, CREATE_VEHICLE_WAREHOUSE } from "./const";

export const receivingOrderVehicleWarehouse = () =>
    testI18n("Receiving Order (Vehicle/Warehouse)", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, [
            "Shared:Reference.orders",
            "ReceivingOrder:menu.orders",
        ]);

        await hasHeaderAndBreadcrumbsStep(
            ["Shared:Reference.orders", "ReceivingOrder:menu.orders"],
            {
                page,
                i18nFix,
            }
        );

        await testI18n.step("has table with ability to create", async () => {
            await expect(page.locator("table")).toBeVisible();
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:create") })
            ).toBeEnabled();
        });

        await testI18n.step("can create new receiving order", async () => {
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await expect(
                page.getByTestId(`tab-header:${i18nFix.t("Shared:commonInfo")}`)
            ).toHaveAttribute("aria-selected", "true");

            await expect(
                page.getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.operations")}`)
            ).toBeDisabled();
            await expect(
                page.getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.presentation")}`)
            ).toBeDisabled();
            await expect(
                page.getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.documentPrint")}`)
            ).toBeDisabled();

            await populateForm(page, CREATE_VEHICLE_WAREHOUSE(i18nFix.t));
            await expect(
                page
                    .getByTestId("form-footer")
                    .getByRole("button", { name: i18nFix.t("Action:next") })
            ).toBeEnabled();

            await page
                .getByTestId("form-footer")
                .getByRole("button", { name: i18nFix.t("Action:next") })
                .click();

            await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
        });

        await testI18n.step("can create new transport", async () => {
            await expect(
                page.getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.transport")}`)
            ).toHaveAttribute("aria-selected", "true");

            await populateForm(page, CREATE_TRANSPORT_FIELDS);
            await expect(
                page
                    .getByTestId("form-footer")
                    .getByRole("button", { name: i18nFix.t("Action:next") })
            ).toBeEnabled();

            await page
                .getByTestId("form-footer")
                .getByRole("button", { name: i18nFix.t("Action:next") })
                .click();

            await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
        });

        // await testI18n.step("can create new contrainer and assign to request", async () => {
        //     await expect(page.locator("table")).toBeVisible();
        //     await expect(
        //         page
        //             .getByTestId("table-footer")
        //             .getByRole("button", { name: i18nFix.t("Action:add") })
        //     ).toBeEnabled();

        //     await page
        //         .getByTestId("table-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:add") })
        //         .click();

        //     await page.getByTestId("inline-button:create").click();

        //     const conainerData = CREATE_CONTAINER_FIELDS(i18nFix.t);
        //     await populateForm(page, conainerData);
        //     containerNumber = conainerData[0].value;

        //     await page
        //         .getByTestId("form-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:save") })
        //         .click();

        //     await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);

        //     await populateForm(page, ASSIGN_CONTAINER_FIELDS(containerNumber));

        //     await expect(
        //         page
        //             .getByTestId("table-footer")
        //             .getByRole("button", { name: i18nFix.t("Action:save") })
        //     ).toBeEnabled();

        //     await page
        //         .getByTestId("table-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:save") })
        //         .click();

        //     await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
        // });

        // await testI18n.step("assign good to container in request", async () => {
        //     await page.getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.goods")}`).click();
        //     await expect(page.locator("table")).toBeVisible();
        //     await expect(
        //         page
        //             .getByTestId("table-footer")
        //             .getByRole("button", { name: i18nFix.t("Action:add") })
        //     ).toBeEnabled();

        //     await page
        //         .getByTestId("table-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:add") })
        //         .click();

        //     await populateForm(page, ASSIGN_GOODS_IN_CONTAINER_FIELDS(containerNumber));

        //     await expect(
        //         page
        //             .getByTestId("table-footer")
        //             .getByRole("button", { name: i18nFix.t("Action:save") })
        //     ).toBeEnabled();

        //     await page
        //         .getByTestId("table-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:save") })
        //         .click();

        //     await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
        // });

        // await testI18n.step("assign requested service to container in request", async () => {
        //     await page
        //         .getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.operations")}`)
        //         .click();

        //     await expect(page.locator("table")).toBeVisible();

        //     await expect(
        //         page
        //             .getByTestId("table-footer")
        //             .getByRole("button", { name: i18nFix.t("Action:add") })
        //     ).toBeEnabled();

        //     await page
        //         .getByTestId("table-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:add") })
        //         .click();

        //     await populateForm(page, [
        //         {
        //             name: "termOfRequestedService",
        //             type: FieldItemType.AUTOCOMPLETE,
        //         },
        //     ]);

        //     await expect(
        //         page
        //             .getByTestId("table-footer")
        //             .getByRole("button", { name: i18nFix.t("Action:save") })
        //     ).toBeEnabled();

        //     await page
        //         .getByTestId("table-footer")
        //         .getByRole("button", { name: i18nFix.t("Action:save") })
        //         .click();

        //     await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
        // });

        // await testI18n.step("can see preview", async () => {
        //     await page
        //         .getByTestId(`tab-header:${i18nFix.t("ReceivingOrder:tabs.presentation")}`)
        //         .click();
        // });
    });
