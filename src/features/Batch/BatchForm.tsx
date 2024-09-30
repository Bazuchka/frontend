import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useEffect, useMemo } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { viewStore } from "src/app/store";
import { useStyles } from "src/features/common/ClientDriverForm/styles";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { IDrawerForm } from "src/shared/hooks/useDrawerForm";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import { v4 as uuidv4 } from "uuid";
import { fieldsConfiguration } from "./configs";

interface BatchFormProps extends IDrawerForm {
    store: Instance<ReturnType<typeof createBaseStore>>;
    clientGoodProps?: {
        client?: { id: string };
        batchAccountingType?: string;
        clientGood?: { id: string };
        goodVariant?: { id: string };
    };
}

const BatchForm: FunctionComponent<BatchFormProps> = observer(
    ({ onClose, onFormStateChange: onStateChange, id, store, clientGoodProps }) => {
        const classes = useStyles();
        const { t } = useTranslation();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fields = useMemo(() => fieldsConfiguration(clientGoodProps), [store.current]);

        useEffect(() => {
            store.setCurrent(id);
            return () => {
                store.setCurrent(null);
            };
        }, [id, store]);

        const {
            isLoading,
            isEditFormMode,
            formState,
            formComponentRef,
            onEdit,
            onFormEditCancel,
            onClickSave,
            onSubmitStart,
            PromptElements,
            onStateFormChanged,
        } = useFormMechanics({
            entityId: id,
            navigation: {},
            onCreate: async (data: FieldValues) => {
                const batch = await store.create({
                    ...data,
                    code: data.name,
                    syncId: uuidv4(),
                });
                viewStore.addAlert({
                    alertMode: "success",
                    message: t("ReceivingOrderBatch:dialog.createSuccess"),
                });

                onClose(true, batch);
                return batch.id;
            },
            onUpdate: async (id, data) => {
                const updatedModel = await store.update({
                    ...data,
                    id: id!,
                });
                viewStore.addAlert({
                    alertMode: "success",
                    message: t("ReceivingOrderBatch:dialog.editSuccess"),
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
                    {t("ReceivingOrderBatch:drawerHeader")})
                </Typography>
                <Box className={classes.form}>
                    <IFormComponent
                        isLoading={isLoading}
                        fields={fields}
                        isEditMode={isEditFormMode}
                        ref={formComponentRef}
                        onSubmit={onSubmitStart}
                        onFormStateChange={handleFormStateChange}
                    />
                    <Footer
                        className={classes.buttons}
                        buttons={(classes) => (
                            <EditFormButtons
                                isEditMode={isEditFormMode}
                                isSaveAllowed={formState.isDirty}
                                isLoading={store.state.isLoading}
                                onEdit={onEdit}
                                onSave={onClickSave}
                                onCancel={onFormEditCancel}
                                className={classes.button}
                                permissionPath={"Batch"}
                            />
                        )}
                    />
                    {PromptElements}
                </Box>
            </Box>
        );
    }
);

export default BatchForm;
