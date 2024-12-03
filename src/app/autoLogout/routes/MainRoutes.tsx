import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { MainLayout } from "src/app/layout/mainLayout";

const MainRoutes = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<MainLayout />}></Route>)
);

export default MainRoutes;
