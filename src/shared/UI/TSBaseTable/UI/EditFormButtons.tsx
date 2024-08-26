import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import { t } from "i18next";
import { FunctionComponent } from "react";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionLevel, PermissionType } from "src/shared/services/PermissionService/types";

interface InlineEditButtonsProps {
    isLoading?: boolean;
    isSaveAllowed?: boolean;
    isEditMode: boolean;
    withNavigation?: boolean;
    onEdit?: () => void;
    onSave: (navigateNext: boolean) => void;
    onCancel: () => void;
    className: string;
    permissionPath: string;
}

const EditFormButtons: FunctionComponent<InlineEditButtonsProps> = ({
    isSaveAllowed,
    isEditMode,
    isLoading = false,
    permissionPath,
    withNavigation,
    onEdit,
    onSave,
    onCancel,
    className,
}) => {
    return (
        <WithPermission
            permission={{
                path: permissionPath,
                level: PermissionLevel.WRITE,
                type: PermissionType.FORM,
            }}>
            {onEdit && (
                <Button disabled={isEditMode} className={className} onClick={onEdit}>
                    {t("Action:edit")}
                </Button>
            )}
            <LoadingButton
                disabled={!isEditMode || (isSaveAllowed !== undefined && !isSaveAllowed)}
                className={className}
                loading={isLoading}
                onClick={() => onSave(false)}>
                {t("Action:save")}
            </LoadingButton>

            <Button disabled={isLoading || !isEditMode} className={className} onClick={onCancel}>
                {t("Action:cancel")}
            </Button>
            {withNavigation && (
                <LoadingButton
                    disabled={!isEditMode}
                    className={className}
                    loading={isLoading}
                    onClick={() => onSave(true)}>
                    {t("Action:next")}
                </LoadingButton>
            )}
        </WithPermission>
    );
};

export default EditFormButtons;
