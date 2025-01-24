/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { PermissionLevel } from "src/shared/types";
import { Button } from "src/shared/UI/Button";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { IReceivingOrderPreview } from "../../store/ReceivingOrderStore/models/ReceivingOrderPreview";
import { fieldsConfiguration } from "./configs";
import {
    receivingOrderPreviewCargoStore,
    receivingOrderPreviewContainerStore,
} from "../../store/ReceivingOrderPreviewStore";
import { OrderType } from "src/shared/helpers/order";
import { ReceivingOrderPreviewContainerRailwayTable } from "./ReceivingOrderPreviewContainerRailwayTable/ReceivingOrderPreviewContainerRailwayTable";
import { ReceivingOrderPreviewContainerVehicleTable } from "./ReceivingOrderPreviewContainerVehicleTable/ReceivingOrderPreviewContainerVehicleTable";
import { ReceivingOrderPreviewWarehouseVehicleTable } from "./ReceivingOrderPreviewWarehouseVehicleTable/ReceivingOrderPreviewWarehouseVehicleTable";

interface ReceivingOrderProps {
    preview: IReceivingOrderPreview;
    isDraft: boolean;
    orderType: OrderType;
}

const ReceivingOrderPreview: FC<ReceivingOrderProps> = observer(
    ({ preview, isDraft, orderType }): JSX.Element => {
        const { t } = useTranslation();
        useEffect(() => {
            preview.getPreview();
        }, [preview]);

        const getFields = () => {
            const tableComponent =
                orderType === OrderType.containerRailway ? (
                    <ReceivingOrderPreviewContainerRailwayTable
                        store={receivingOrderPreviewContainerStore}
                        orderId={preview?.model?.id}
                    />
                ) : orderType === OrderType.containerVehicle ? (
                    <ReceivingOrderPreviewContainerVehicleTable
                        store={receivingOrderPreviewContainerStore}
                        orderId={preview?.model?.id}
                    />
                ) : (
                    <ReceivingOrderPreviewWarehouseVehicleTable
                        store={receivingOrderPreviewCargoStore}
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
                                    path: "ReceivingOrder",
                                    level: PermissionLevel.WRITE,
                                    type: PermissionType.FORM,
                                }}>
                                <Button
                                    className={classes.button}
                                    onClick={() => preview.sendDraft()}>
                                    {t("ReceivingOrderPreview:sendButton")}
                                </Button>
                            </WithPermission>
                        )}
                    />
                )}
            </>
        );
    }
);

export default ReceivingOrderPreview;
