import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { ExternalEventsHandle, IDrawerForm } from "src/shared/hooks/useDrawerForm";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import { v4 as uuidv4 } from "uuid";
import { fieldsConfiguration } from "./configs";
import { useStyles } from "./styles";

interface ContainerFormProps extends IDrawerForm {}

const ContainerFormForwarded = (
    {
        onClose,
        onFormStateChange: onStateChange,
        id,
        store,
        fieldOptions,
        isReadOnly,
    }: ContainerFormProps,
    ref: ForwardedRef<ExternalEventsHandle>
) => {
    const { t } = useTranslation();
    const classes = useStyles();
    useEffect(() => {
        store.setCurrent(id);
        return () => {
            store.setCurrent(null);
        };
    }, [id, store]);

    useImperativeHandle(ref, () => {
        return {
            onClose: onFormEditCancel,
        };
    });

    const fields = useMemo(
        () => fieldsConfiguration(store.current, fieldOptions),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [store.current, fieldOptions]
    );
    const {
        isLoading,
        isEditFormMode,
        formState,
        formComponentRef,
        onEdit,
        onFormEditCancel,
        onClickSave,
        onSubmitStart,
        onStateFormChanged,
    } = useFormMechanics({
        entityId: id,
        navigation: {},
        onCreate: async (data) => {
            const createdModel = await store.create({
                ...data,
                syncId: uuidv4(),
            });
            viewStore.addAlert({
                alertMode: "success",
                message: t("Container:dialog.createSuccess"),
            });

            onClose(true, createdModel);
            return createdModel.id;
        },
        onUpdate: async (id, data) => {
            const updatedModel = await store.update({
                ...data,
                id: id!,
            });
            viewStore.addAlert({
                alertMode: "success",
                message: t("Container:dialog.editSuccess"),
            });

            onClose(true, updatedModel);
        },
        onDestroy: () => {
            onClose(false);
        },
    });

    const handleFormStateChange = (state: {
        errors: FieldErrors;
        isValid: boolean;
        isDirty: boolean;
    }) => {
        onStateChange?.(state.isDirty);
        onStateFormChanged(state);
    };

    return (
        <Box className={classes.rootBox}>
            <Typography variant="h4">
                {store.current?.code ?? `${t("Shared:menu.new.masculine")}*`} (
                {t("Container:drawerHeader")})
            </Typography>
            <Box className={classes.form}>
                <IFormComponent
                    isLoading={isLoading}
                    fields={fields}
                    isEditMode={!isReadOnly && isEditFormMode}
                    ref={formComponentRef}
                    onSubmit={onSubmitStart}
                    onFormStateChange={handleFormStateChange}
                />
                <Footer
                    className={classes.buttons}
                    buttons={(classes) =>
                        !isReadOnly && (
                            <EditFormButtons
                                isEditMode={isEditFormMode}
                                isSaveAllowed={formState.isDirty}
                                isLoading={store.state.isLoading}
                                onEdit={onEdit}
                                onSave={onClickSave}
                                onCancel={onFormEditCancel}
                                className={classes.button}
                                permissionPath={"Container"}
                            />
                        )
                    }
                />
            </Box>
        </Box>
    );
};

export const ContainerForm = observer(forwardRef(ContainerFormForwarded));
