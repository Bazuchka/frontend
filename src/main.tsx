import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

import SessionTimeout from "./app/autoLogout/SessionTimeout.tsx";
import "./app/localization/configuration";
import "./index.css";
import reportWebVitals from "./reportWebVitals.ts";
import { authService } from "./shared/services/AuthService/index.ts";
import { permissionService } from "./shared/services/PermissionService";

const renderApp = () => {
    const root = createRoot(document.getElementById("root") as HTMLElement);

    root.render(
        <SessionTimeout>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </SessionTimeout>
    );
};

authService.initKeycloak(() => {
    // in case of permissionService placement in authService we stumble on circular dependency
    permissionService.load().then(() => {
        renderApp();
        // used for load monitoring, probably we should turn off this on prod.
        reportWebVitals();
    });
});
