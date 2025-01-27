import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { PermissionLevel } from "src/shared/types";
import { Button } from "src/shared/UI/Button";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { IShippingOrderPreview } from "../../store/ShippingOrderStore/models/ShippingOrderPreview";
import { fieldsConfiguration } from "./configs";
import { OrderType } from "src/shared/helpers/order";
import {
    shippingOrderPreviewCargoStore,
    shippingOrderPreviewContainerStore,
} from "../../store/ShippingOrderPreviewStore";
import { ShippingOrderPreviewContainerVehicleTable } from "./ShippingOrderPreviewContainerVehicleTable/ShippingOrderPreviewContainerVehicleTable";
import { ShippingOrderPreviewWarehouseVehicleTable } from "./ShippingOrderPreviewWarehouseVehicleTable/ShippingOrderPreviewWarehouseVehicleTable";

interface ShippingOrderPreviewProps {
    preview: IShippingOrderPreview;
    isDraft: boolean;
    orderType: OrderType;
}

const ShippingOrderPreview: FC<ShippingOrderPreviewProps> = observer(
    ({ preview, isDraft, orderType }): JSX.Element => {
        const { t } = useTranslation();
        useEffect(() => {
            preview.getPreview();
        }, [preview]);

        const getFields = () => {
            const tableComponent =
                orderType === OrderType.containerVehicle ? (
                    <ShippingOrderPreviewContainerVehicleTable
                        store={shippingOrderPreviewContainerStore}
                        orderId={preview?.model?.id}
                    />
                ) : (
                    <ShippingOrderPreviewWarehouseVehicleTable
                        store={shippingOrderPreviewCargoStore}
                        orderId={preview?.model?.id}
                    />
                );

            return !preview.model
                ? []
                : fieldsConfiguration({ data: preview.model!, tableComponent, orderType });
        };

        return (
            <>
                <IFormComponent
                    fields={getFields()}
                    isLoading={!preview.model}
                    isEditMode={false}
                />
                {isDraft && (
                    <Footer
                        buttons={(classes) => (
                            <WithPermission
                                permission={{
                                    path: "ShippingOrder",
                                    level: PermissionLevel.WRITE,
                                    type: PermissionType.FORM,
                                }}>
                                <Button
                                    className={classes.button}
                                    onClick={() => preview.sendDraft()}>
                                    {t("ShippingOrderPreview:sendButton")}
                                </Button>
                            </WithPermission>
                        )}
                    />
                )}
            </>
        );
    }
);

export default ShippingOrderPreview;
