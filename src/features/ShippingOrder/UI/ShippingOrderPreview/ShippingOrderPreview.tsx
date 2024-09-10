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

interface ShippingOrderProps {
    preview: IShippingOrderPreview;
    isDraft: boolean;
    showContainerInfo: boolean;
}

const ShippingOrderInfo: FC<ShippingOrderProps> = observer(
    ({ preview, isDraft, showContainerInfo }): JSX.Element => {
        const { t } = useTranslation();
        useEffect(() => {
            preview.getPreview();
        }, [preview]);

        return (
            <>
                <IFormComponent
                    fields={
                        !preview.model ? [] : fieldsConfiguration(preview.model!, showContainerInfo)
                    }
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

export default ShippingOrderInfo;
