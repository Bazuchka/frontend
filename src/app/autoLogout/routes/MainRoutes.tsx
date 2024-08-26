import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { MainLayout } from "src/app/layout/mainLayout";

const MainRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            {/*<Route path="/" element={<UserInfo />} />
            {<Route element={<PermissionRoute path={"Warehouse"} />}>
                <Route path="/warehouse" element={<Warehouse />} />
            </Route>
            <Route element={<PermissionRoute path={"LegalEntity"} />}>
                <Route path="/LegalEntity" element={<LegalEntity />} />
            </Route> */}
        </Route>
    )
);

export default MainRoutes;
