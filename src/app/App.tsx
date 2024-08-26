import { ThemeProvider } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react";
import { FC, Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import dictionaryStore from "src/shared/store/DictionaryStore";
import { theme } from "../theme";
import "./App.css";
import { ErrorRoutes, MainRoutes } from "./routes";

const App: FC = (): JSX.Element => {
    useEffect(() => {
        document.title = t("Shared:appName");
        dictionaryStore.fetch();
    }, []);

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
