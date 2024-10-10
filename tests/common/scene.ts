/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, Page } from "@playwright/test";
import { testI18n } from "../fixtures/i18n.fixture";

export const loadScene = async (
    { page, i18nFix }: { page: Page; i18nFix: any },
    path: string[]
) => {
    await testI18n.step("load scene", async () => {
        for (let i = 0; i < path.length; i++) {
            await page.getByText(i18nFix.t(path[i])).click();
        }

        await expect(page.getByTestId("progress")).toHaveCount(0);
    });
};

export const editableTableInitialStateCheck = async ({
    page,
    i18nFix,
}: {
    page: Page;
    i18nFix: any;
}) => {
    await testI18n.step("has table with buttons (intial)", async () => {
        await expect(page.locator("table")).toBeVisible();
        await expect(
            page.getByTestId("table-footer").getByRole("button", { name: i18nFix.t("Action:edit") })
        ).toBeDisabled();
        await expect(
            page.getByTestId("table-footer").getByRole("button", { name: i18nFix.t("Action:save") })
        ).toBeDisabled();
        await expect(
            page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:cancel") })
        ).toBeDisabled();
        await expect(
            page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
        ).toBeEnabled();
    });
};

export const editableTableDirtyFieldStateCheck = async ({
    page,
    i18nFix,
}: {
    page: Page;
    i18nFix: any;
}) => {
    await testI18n.step("has table with buttons (dirty fields)", async () => {
        await expect(page.locator("table")).toBeVisible();
        await expect(
            page.getByTestId("table-footer").getByTestId(`button:${i18nFix.t("Action:save")}`)
        ).toBeEnabled();
        await expect(
            page.getByTestId("table-footer").getByTestId(`button:${i18nFix.t("Action:cancel")}`)
        ).toBeEnabled();
        await expect(
            page.getByTestId("table-footer").getByTestId(`button:${i18nFix.t("Action:edit")}`)
        ).toBeDisabled();
        await expect(
            page.getByTestId("table-footer").getByTestId(`button:${i18nFix.t("Action:create")}`)
        ).toBeDisabled();
    });
};
