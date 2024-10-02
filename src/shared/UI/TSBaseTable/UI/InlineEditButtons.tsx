import LoadingButton from "@mui/lab/LoadingButton";
import { t } from "i18next";
import { FunctionComponent } from "react";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionLevel, PermissionType } from "src/shared/services/PermissionService/types";
import { Button } from "../../Button";

interface InlinetEditButtonsProps {
    tableState: {
        isLoading: boolean;
        isCreating: boolean;
        isUpdating: boolean;
    };
    isEditMode: boolean;
    isSaveAllowed?: boolean;
    editableRowIsValid: boolean;
    isRowSelected: boolean;
    onCreate?: () => void;
    onEdit?: (() => void) | undefined;
    onSave: (navigateNext?: boolean) => void;
    onNext?: () => void;
    onCancel: () => void;
    onDelete?: (() => void) | undefined;
    className: string;
    permissionPath: string;
    useNextButton?: boolean;
    label?: {
        create?: string;
    };
}

const InlinetEditButtons: FunctionComponent<InlinetEditButtonsProps> = ({
    tableState,
    isRowSelected,
    isEditMode,
    isSaveAllowed,
    permissionPath,
    onCreate,
    onEdit,
    onSave,
    onCancel,
    onDelete,
    onNext,
    className,
    useNextButton,
    label,
}) => {
    return (
        <WithPermission
            permission={{
                path: permissionPath,
                level: PermissionLevel.WRITE,
                type: PermissionType.FORM,
            }}>
            {onCreate && (
                <WithPermission
                    permission={{
                        path: permissionPath,
                        level: PermissionLevel.CREATE,
                        type: PermissionType.FORM,
                    }}>
                    <Button
                        disabled={tableState.isLoading || isEditMode}
                        className={className}
                        onClick={onCreate}>
                        {label?.create ?? t("Action:create")}
                    </Button>
                </WithPermission>
            )}
            {onEdit && (
                <Button
                    disabled={tableState.isLoading || !isRowSelected || isEditMode}
                    className={className}
                    onClick={onEdit}>
                    {t("Action:edit")}
                </Button>
            )}
            {onDelete && (
                <Button
                    disabled={tableState.isLoading || !isRowSelected || isEditMode}
                    className={className}
                    onClick={onDelete}>
                    {t("Action:delete")}
                </Button>
            )}
            <LoadingButton
                disabled={
                    tableState.isLoading ||
                    !isEditMode ||
                    (isSaveAllowed !== undefined && !isSaveAllowed)
                }
                className={className}
                loading={tableState.isCreating}
                onClick={() => onSave()}>
                {t("Action:save")}
            </LoadingButton>

            <Button
                disabled={tableState.isLoading || !isEditMode}
                className={className}
                onClick={onCancel}>
                {t("Action:cancel")}
            </Button>

            {useNextButton && (
                <LoadingButton
                    disabled={tableState.isLoading}
                    className={className}
                    loading={tableState.isCreating}
                    onClick={() => {
                        if (isEditMode) {
                            onSave(true);
                        } else {
                            onNext?.();
                        }
                    }}>
                    {t("Action:next")}
                </LoadingButton>
            )}
        </WithPermission>
    );
};

export default InlinetEditButtons;
