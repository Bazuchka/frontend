import { expect, Page } from "@playwright/test";

export const autocompleteSelect = async (
    page: Page,
    params: {
        text: string;
        autocompleteId: string;
        isSelect?: boolean;
    }
) => {
    await page
        .getByTestId(`${params.isSelect ? "select" : "autocomplete"}:${params.autocompleteId}`)
        .click();
    if (!params.isSelect) {
        await page
            .getByTestId(`autocomplete:${params.autocompleteId}`)
            .getByRole("combobox")
            .fill(params.text);

        await page.waitForTimeout(500);
    }

    if (!params.isSelect) {
        await page.locator(".MuiAutocomplete-listbox").getByRole("option").first().click();
    } else {
        await page.getByRole("listbox").getByText(params.text).first().click();
    }
};

export const checkAutocompleteIsInvalid = async (page: Page, autocompleteId: string) => {
    await expect(
        page.getByTestId(`autocomplete:${autocompleteId}`).getByRole("combobox")
    ).toHaveAttribute("aria-invalid", "true");
};
