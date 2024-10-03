import { expect, test as setup } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Имя пользователя или E-mail").fill("autotest");
    await page.getByLabel("Пароль").fill("autotest");
    await page.getByRole("button", { name: /Войти/i }).click();
    await expect(page.getByAltText("alis-logo")).toBeVisible();
    await page.context().storageState({ path: authFile });
});
