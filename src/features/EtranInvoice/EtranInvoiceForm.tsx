import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { ElementRef, FunctionComponent, useMemo, useRef, useState } from "react";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
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

interface EtranInvoiceFormProps extends IDrawerForm {
    store: Instance<ReturnType<typeof createBaseStore>>;
    handleCreated?: (data: unknown | undefined) => void;
    handleUpdated?: (data: unknown | undefined) => void;
    editForm?: boolean;
    etranInvoiceProps?: {
        client?: { id: string };
    };
}

const EtranInvoiceForm: FunctionComponent<EtranInvoiceFormProps> = observer(
    ({
        onClose,
        onFormStateChange,
        handleCreated,
        handleUpdated,
        id,
        store,
        editForm,
        etranInvoiceProps,
    }) => {
        const classes = useStyles();
        const formComponentRef = useRef<ElementRef<typeof IFormComponent>>(null);
        const [isEditFormMode, setIsEditFormMode] = useState(!id || editForm);
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
                    const entity = await store.create({
                        ...data,
                        code: data.isEtranCreated ? data.code : null,
                        syncId: uuidv4(),
                        active: true,
                    });
                    viewStore.addAlert({
                        alertMode: "success",
                        message: t("EtranInvoice:dialog.createSuccess"),
                    });

                    if (handleCreated) {
                        handleCreated(entity);
                    }
                } else {
                    await store.update({
                        ...data,
                        code: data.isEtranCreated ? data.code : null,
                        id: id!,
                    });

                    // TODO Remove setCurrent, fix server updated data (related entities returns only with ids)
                    await store.setCurrent(id!);

                    viewStore.addAlert({
                        alertMode: "success",
                        message: t("EtranInvoice:dialog.editSuccess"),
                    });

                    if (handleUpdated && store.current) {
                        handleUpdated(store.current);
                    }
                }

                onClose(true);
            } catch (err: unknown) {
                console.log(err);
            }
        };

        const [isEtranCreated, setFormIsEtranCreated] = useState<boolean>(
            !store.current || (store.current?.id && store.current?.code)
        );

        const handleIsEtranCreatedFormChange = async (
            data: FieldValues,
            setValue: UseFormSetValue<FieldValues>
        ) => {
            if (data.isEtranCreated !== undefined) {
                setFormIsEtranCreated(data.isEtranCreated);

                if (!data.isEtranCreated) {
                    setValue("code", t("EtranInvoice:default.code"));
                }
            }
        };

        const fields = useMemo(
            () => fieldsConfiguration(etranInvoiceProps, isEtranCreated),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [store.current, etranInvoiceProps, isEtranCreated]
        );

        return (
            <Box className={classes.rootBox}>
                <Typography variant="h4">
                    {store.current?.code ?? `${t("Shared:menu.new.masculine")}*`} (
                    {t("EtranInvoice:drawerHeader")})
                </Typography>
                <Box className={classes.form}>
                    <IFormComponent
                        isWaitingStore={store.state.isFetching}
                        fields={fields}
                        isEditMode={isEditFormMode!}
                        ref={formComponentRef}
                        onSubmit={handleSubmit}
                        onFormStateChange={handleFormStateChange}
                        onTriggerFieldsChange={{
                            isEtranCreated: handleIsEtranCreatedFormChange,
                        }}
                    />
                    <Footer
                        className={classes.buttons}
                        buttons={(classes) => (
                            <EditFormButtons
                                isEditMode={isEditFormMode!}
                                isSaveAllowed={isDirty}
                                isLoading={store.state.isLoading}
                                onSave={handleClickSave}
                                onCancel={handleCancel}
                                className={classes.button}
                                permissionPath={"ShippingOrder.EtranInvoice"}
                            />
                        )}
                    />
                </Box>
            </Box>
        );
    }
);

export default EtranInvoiceForm;
