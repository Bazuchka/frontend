import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import {
    ElementRef,
    ForwardedRef,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useBeforeUnload } from "react-router-dom";
import { viewStore } from "src/app/store";
import { DialogPrompt, ShowPromptHandle } from "src/shared/UI/DialogPrompt";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { DIALOG_ACTION } from "src/shared/enums/enums";
import { ExternalEventsHandle, IDrawerForm } from "src/shared/hooks/useDrawerForm";
import { v4 as uuidv4 } from "uuid";
import { fieldsConfiguration } from "./configs";
import { useStyles } from "./styles";

interface ClientVehicleFormProps extends IDrawerForm {}

const ClientVehicleFormForwarded = (
    { onClose, onFormStateChange, id, store, fieldOptions, isReadOnly }: ClientVehicleFormProps,
    ref: ForwardedRef<ExternalEventsHandle>
) => {
    const formComponentRef = useRef<ElementRef<typeof IFormComponent>>(null);
    const [isEditFormMode, setIsEditFormMode] = useState(!id);
    const [isDirty, setIsDirty] = useState(false);
    const { t } = useTranslation();
    const editPromptModalRef = useRef<ShowPromptHandle>(null);
    const [externalClosingInProgress, setExternalClosingInProgress] = useState(false);
    const classes = useStyles();

    const isCreate = useMemo(() => {
        return !id;
    }, [id]);

    const handleEdit = () => {
        setIsEditFormMode(true);
    };

    const handleClickSave = () => {
        formComponentRef.current?.submitForm();
    };

    const handleCancel = () => {
        if (!isDirty) {
            if (isCreate) {
                onClose();
            }
            setIsEditFormMode(false);
            return;
        }

        if (isCreate) {
            onClose();
        } else {
            editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
        }
    };

    const handleExternalClose = () => {
        if (!isDirty) {
            onClose();
        } else {
            setExternalClosingInProgress(true);
            editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
        }
    };

    const handleCancelConfirm = () => {
        setIsEditFormMode(false);
        if (externalClosingInProgress) {
            setExternalClosingInProgress(false);
            onClose();
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
        try {
            if (isCreate) {
                const createdModel = await store.create({
                    ...data,
                    active: data.active ?? false,
                    refrigerator: data.refrigerator ?? false,
                    withTrailer: data.withTrailer ?? false,
                    syncId: uuidv4(),
                });
                viewStore.addAlert({
                    alertMode: "success",
                    message: t("ClientVehicle:dialog.createSuccess"),
                });

                onClose(true, createdModel);
            } else {
                const updatedModel = await store.update({
                    ...data,
                    id: id!,
                });
                viewStore.addAlert({
                    alertMode: "success",
                    message: t("ClientVehicle:dialog.editSuccess"),
                });

                onClose(true, updatedModel);
            }
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const fields = useMemo(
        () => fieldsConfiguration(store.current, fieldOptions),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [store.current, store]
    );

    useEffect(() => {
        store.setCurrent(id);
        return () => {
            store.setCurrent(null);
        };
    }, [id, store]);

    return (
        <Box className={classes.rootBox}>
            <Typography variant="h4">
                {store.current?.code ?? `${t("Shared:menu.new.masculine")}*`} (
                {t("ClientVehicle:drawerHeader")})
            </Typography>
            <Box className={classes.form}>
                <IFormComponent
                    isWaitingStore={store.state.isFetching}
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
                                isSaveAllowed={isDirty}
                                isLoading={store.state.isLoading}
                                onEdit={handleEdit}
                                onSave={handleClickSave}
                                onCancel={handleCancel}
                                className={classes.button}
                                permissionPath={"ClientVehicle"}
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

export const ClientVehicleForm = observer(forwardRef(ClientVehicleFormForwarded));
