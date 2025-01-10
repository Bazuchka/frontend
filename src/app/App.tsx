import { ThemeProvider } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react";
import { FC, Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import dictionaryStore from "src/shared/store/DictionaryStore";
import "./App.css";
import { ErrorRoutes, MainRoutes } from "./routes";
import { getTheme, ThemeList } from "src/theme";
import { lsKeys, useLocalStorage } from "src/shared/hooks/useLocalStorage";

const App: FC = (): JSX.Element => {
    const lsTheme = useLocalStorage<ThemeList | null>(lsKeys.theme);

    const defaultThemeName = lsTheme.lsData || ThemeList.default;
    const [theme, setTheme] = useState(getTheme(defaultThemeName));

    useEffect(() => {
        document.title = t("Shared:appName");

        dictionaryStore.fetch();

        lsTheme.setItem(defaultThemeName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTheme(getTheme(lsTheme.lsData));
    }, [lsTheme.lsData]);

    return (
        <Suspense>
            <ThemeProvider theme={theme}>
                {dictionaryStore.isReady && <RouterProvider router={MainRoutes} />}
                {dictionaryStore.isError && <RouterProvider router={ErrorRoutes} />}
            </ThemeProvider>
        </Suspense>
    );
};

export default observer(App);
