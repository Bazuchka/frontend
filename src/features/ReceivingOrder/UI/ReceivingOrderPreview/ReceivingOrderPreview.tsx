import { observer } from "mobx-react";
import { FC, useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { PermissionLevel } from "src/shared/types";
import { Button } from "src/shared/UI/Button";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { IReceivingOrderPreview } from "../../store/ReceivingOrderStore/models/ReceivingOrderPreview";
import { fieldsConfiguration } from "./configs";

interface ReceivingOrderProps {
    preview: IReceivingOrderPreview;
    isDraft: boolean;
}

const ReceivingOrderInfo: FC<ReceivingOrderProps> = observer(
    ({ preview, isDraft }): JSX.Element => {
        const { t } = useTranslation();
        useLayoutEffect(() => {
            preview.getPreview();
        }, [preview]);

        const fields = useMemo(
            () => (!preview.model ? [] : fieldsConfiguration(preview.model!)),
            [preview.model]
        );

        return (
            <>
                <IFormComponent fields={fields} isLoading={!preview.model} isEditMode={false} />
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

export default ReceivingOrderInfo;
