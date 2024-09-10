import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { Client, ClientTable } from "src/features/Client";
import { ClientDriverTable } from "src/features/ClientDriverTable";
import { ClientGood, ClientGoodTable } from "src/features/ClientGood";
import { ClientGoodTypeTable } from "src/features/ClientGoodTypeTable";
import { ClientRelatedEntityTable } from "src/features/ClientRelatedEntityTable";
import { ClientVehicleTable } from "src/features/ClientVehicle";
import { LegalEntity, LegalEntityTable } from "src/features/LegalEntity";
import { ReceivingOrder, ReceivingOrderTable } from "src/features/ReceivingOrder";
import { ShippingOrder, ShippingOrderTable } from "src/features/ShippingOrder";
import { Service, ServicesTable } from "src/features/Service";
import { TermOfService } from "src/features/TermOfService";
import TermsOfServiceTable from "src/features/TermOfService/UI/TermsOfServiceTable";
import { UnitOfMeasureTable } from "src/features/UnitOfMeasure";
import { User, UserTable } from "src/features/Administration/Users";
import { PermissionRoute } from "src/shared/services/PermissionService";
import { MainLayout } from "../layout/mainLayout";

export const MainRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route element={<PermissionRoute path={"Client"} />}>
                <Route path="/clients" element={<ClientTable />} />
                <Route path="/client/:id" element={<Client />} />
            </Route>
            <Route element={<PermissionRoute path={"ClientRelatedEntity"} />}>
                <Route path="/client-related-entities" element={<ClientRelatedEntityTable />} />
            </Route>
            <Route element={<PermissionRoute path={"ClientGoodType"} />}>
                <Route path="/client-good-types" element={<ClientGoodTypeTable />} />
            </Route>
            <Route element={<PermissionRoute path={"LegalEntity"} />}>
                <Route path="/legal-entities" element={<LegalEntityTable />} />
                <Route path="/legal-entity/:id" element={<LegalEntity />} />
            </Route>
            <Route element={<PermissionRoute path={"Service"} />}>
                <Route path="/services" element={<ServicesTable />} />
                <Route path="/service/:id" element={<Service />} />
            </Route>
            <Route element={<PermissionRoute path={"TermOfService"} />}>
                <Route path="/term-of-services" element={<TermsOfServiceTable />} />
                <Route path="/term-of-service/create" element={<TermOfService />} />
                <Route path="/term-of-service/:id" element={<TermOfService />} />
            </Route>

            <Route element={<PermissionRoute path={"ClientGood"} />}>
                <Route path="/client-goods" element={<ClientGoodTable />} />
                <Route path="/client-good/create" element={<ClientGood />} />
                <Route path="/client-good/:id" element={<ClientGood />} />
            </Route>

            <Route element={<PermissionRoute path={"ClientDriver"} />}>
                <Route path="/client-drivers" element={<ClientDriverTable />} />
            </Route>

            <Route element={<PermissionRoute path={"UnitOfMeasure"} />}>
                <Route path="/units-of-measure" element={<UnitOfMeasureTable />} />
            </Route>

            <Route element={<PermissionRoute path={"ClientVehicle"} />}>
                <Route path="/client-vehicles" element={<ClientVehicleTable />} />
            </Route>

            <Route element={<PermissionRoute path={"ReceivingOrder"} />}>
                <Route path="/receiving-orders" element={<ReceivingOrderTable />} />
                <Route path="/receiving-order/create" element={<ReceivingOrder />} />
                <Route path="/receiving-order/:id" element={<ReceivingOrder />} />
            </Route>

            <Route element={<PermissionRoute path={"ShippingOrder"} />}>
                <Route path="/shipping-orders" element={<ShippingOrderTable />} />
                <Route path="/shipping-order/create" element={<ShippingOrder />} />
                <Route path="/shipping-order/:id" element={<ShippingOrder />} />
            </Route>
            <Route element={<PermissionRoute path={"User"} />}>
                <Route path="/users" element={<UserTable />} />
                <Route path="/users/create" element={<User />} />
                <Route path="/users/:id" element={<User />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    )
);

export const ErrorRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    )
);
