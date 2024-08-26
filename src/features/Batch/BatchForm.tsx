import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { ElementRef, FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useBeforeUnload } from "react-router-dom";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { IDrawerForm } from "src/shared/hooks/useDrawerForm";
import { v4 as uuidv4 } from "uuid";
import { fieldsConfiguration } from "./configs";
import { useStyles } from "src/features/common/ClientDriverForm/styles";

interface BatchFormProps extends IDrawerForm {
    store: Instance<ReturnType<typeof createBaseStore>>;
    handleCreated?: (data: unknown | undefined) => void;
    clientGoodProps?: {
        client?: { id: string };
        batchAccountingType?: string;
        clientGood?: { id: string };
        goodVariant?: { id: string };
    };
}

const BatchForm: FunctionComponent<BatchFormProps> = observer(
    ({ onClose, onFormStateChange, handleCreated, id, store, clientGoodProps }) => {
        const classes = useStyles();
        const formComponentRef = useRef<ElementRef<typeof IFormComponent>>(null);
        const [isEditFormMode, setIsEditFormMode] = useState(!id);
        const [isDirty, setIsDirty] = useState(false);
        const { t } = useTranslation();

        const isCreate = useMemo(() => {
            return !id;
        }, [id]);

        const handleClickSave = () => {
            formComponentRef.current?.submitForm();
        };

        const handleCancel = () => {
            onClose();
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
                    const batch = await store.create({
                        ...data,
                        code: data.name,
                        syncId: uuidv4(),
                    });
                    viewStore.addAlert({
                        alertMode: "success",
                        message: t("ReceivingOrderBatch:dialog.createSuccess"),
                    });

                    if (handleCreated) {
                        handleCreated(batch);
                    }
                } else {
                    await store.update({
                        ...data,
                        id: id!,
                    });
                    viewStore.addAlert({
                        alertMode: "success",
                        message: t("ReceivingOrderBatch:dialog.editSuccess"),
                    });
                }

                onClose(true);
            } catch (err: unknown) {
                console.log(err);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fields = useMemo(() => fieldsConfiguration(clientGoodProps), [store.current]);

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
                    {t("ReceivingOrderBatch:drawerHeader")})
                </Typography>
                <Box className={classes.form}>
                    <IFormComponent
                        isWaitingStore={store.state.isFetching}
                        fields={fields}
                        isEditMode={isEditFormMode}
                        ref={formComponentRef}
                        onSubmit={handleSubmit}
                        onFormStateChange={handleFormStateChange}
                    />
                    <Footer
                        className={classes.buttons}
                        buttons={(classes) => (
                            <EditFormButtons
                                isEditMode={isEditFormMode}
                                isSaveAllowed={isDirty}
                                isLoading={store.state.isLoading}
                                onSave={handleClickSave}
                                onCancel={handleCancel}
                                className={classes.button}
                                permissionPath={"ClientDriver"}
                            />
                        )}
                    />
                </Box>
            </Box>
        );
    }
);

export default BatchForm;
