import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import {
    ElementRef,
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useBeforeUnload } from "react-router-dom";
import { DialogPrompt, ShowPromptHandle } from "src/shared/UI/DialogPrompt";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { DIALOG_ACTION } from "src/shared/enums/enums";
import { ExternalEventsHandle, IDrawerForm } from "src/shared/hooks/useDrawerForm";
import { IDimensions } from "../DimensionsLink";
import { fieldsConfiguration } from "./configs";
import { useStyles } from "./styles";

interface DimensionsFormProps extends Omit<IDrawerForm, "store" | "id"> {
    defaultValue: IDimensions;
    permissionPath: string;
}

const DimensionsFormForwarded = (
    { onClose, onFormStateChange, isReadOnly, defaultValue, permissionPath }: DimensionsFormProps,
    ref: ForwardedRef<ExternalEventsHandle>
) => {
    const formComponentRef = useRef<ElementRef<typeof IFormComponent>>(null);
    const [isEditFormMode, setIsEditFormMode] = useState(true);
    const [data, setData] = useState<IDimensions>(defaultValue);
    const [submited, setSubmited] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const { t } = useTranslation();
    const editPromptModalRef = useRef<ShowPromptHandle>(null);
    const [externalClosingInProgress, setExternalClosingInProgress] = useState(false);
    const classes = useStyles();

    const handleEdit = () => {
        setIsEditFormMode(true);
    };

    const handleClickSave = () => {
        formComponentRef.current?.submitForm();
    };

    const handleCancel = () => {
        if (!isDirty) {
            setIsEditFormMode(false);
            return;
        }

        editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
    };

    const handleExternalClose = () => {
        if (!isDirty) {
            onClose(submited, data);
        } else {
            setExternalClosingInProgress(true);
            editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
        }
    };

    const handleCancelConfirm = () => {
        setIsEditFormMode(false);
        if (externalClosingInProgress) {
            setExternalClosingInProgress(false);
            onClose(submited, data);
        }
    };

    const handleCancelProceed = () => {
        setExternalClosingInProgress(false);
    };

    const handleUnload = () => {
        if (!isDirty) {
            setIsEditFormMode(false);
            return true;
        }

        return false;
    };

    useBeforeUnload(
        (e) => {
            if (!handleUnload()) {
                e.preventDefault();
            }
        },
        { capture: true }
    );

    useImperativeHandle(ref, () => {
        return {
            onClose: handleExternalClose,
        };
    });

    const handleFormStateChange = ({
        isDirty,
    }: {
        errors: FieldErrors;
        isValid: boolean;
        isDirty: boolean;
    }) => {
        setIsDirty(isDirty);
        onFormStateChange?.(isDirty);
    };

    const handleSubmit = async (data: FieldValues) => {
        setIsEditFormMode(false);
        setData(data as IDimensions);
        setSubmited(true);
    };

    const fields = useMemo(
        () => fieldsConfiguration(data),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    );

    return (
        <Box>
            <Typography variant="h4">{t("Dimensions:drawerHeader")}</Typography>
            <Box className={classes.form}>
                <IFormComponent
                    fields={fields}
                    isEditMode={!isReadOnly && isEditFormMode}
                    ref={formComponentRef}
                    onSubmit={handleSubmit}
                    onFormStateChange={handleFormStateChange}
                />
                <Footer
                    className={classes.buttons}
                    buttons={(classes) =>
                        !isReadOnly && (
                            <EditFormButtons
                                isEditMode={isEditFormMode}
                                onEdit={handleEdit}
                                onSave={handleClickSave}
                                onCancel={handleCancel}
                                className={classes.button}
                                permissionPath={permissionPath}
                            />
                        )
                    }
                />
                <DialogPrompt
                    onProceed={handleCancelConfirm}
                    ref={editPromptModalRef}
                    onReset={handleCancelProceed}
                />
            </Box>
        </Box>
    );
};

export const DimensionsForm = observer(forwardRef(DimensionsFormForwarded));
