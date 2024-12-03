import { expect } from "@playwright/test";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import { loadScene } from "./common/scene";
import { UNIT_OF_MEASURE_TEST } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

export const unitOfMeasure = () =>
    testI18n("Unit Of Measure", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, [
            "Shared:Reference.configuration",
            "UnitOfMeasure:menu",
        ]);

        await hasHeaderAndBreadcrumbsStep(
            ["Shared:Reference.configuration", "UnitOfMeasure:menu"],
            { page, i18nFix }
        );

        await testI18n.step("has table with a unit of measure", async () => {
            await expect(page.locator("table")).toContainText(UNIT_OF_MEASURE_TEST);
        });
    });
