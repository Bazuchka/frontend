import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FC, useEffect, useMemo, useState } from "react";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { viewStore } from "src/app/store";
import { IFullClientDriver } from "src/features/ClientDriverTable/store/ClientDriverStore";
import { IFullClientVehicle } from "src/features/ClientVehicle/store/ClientVehicleStore";
import { ClientDriverForm } from "src/features/common/ClientDriverForm";
import { ClientVehicleForm } from "src/features/common/ClientVehicleForm";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import { IDrawerForm, useDrawerForm } from "src/shared/hooks/useDrawerForm";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import { UseForm } from "src/shared/types";
import { ShippingOrderTransportStore } from "../../store/ShippingOrderTransportStore";
import { fieldsConfiguration, IDriverInfo, IVehicleInfo } from "./configs";
import { mapFormToCreateDTO, mapFormToUpdateDTO } from "./mapper";

interface ShippingOrderTransportProps {
    store: Instance<typeof ShippingOrderTransportStore>;
    client: {
        id: string;
        code: string;
    };
    shippingOrderId: string;
    isReadOnly: boolean;
}

const ShippingOrderTransport: FC<ShippingOrderTransportProps> = observer(
    ({ store, client, shippingOrderId, isReadOnly }): JSX.Element => {
        const {
            isLoading,
            isEditFormMode,
            formState,
            formComponentRef,
            onEdit,
            onFormEditCancel,
            onClickSave,
            onSubmitStart,
            onNextClick,
            PromptElements,
            onStateFormChanged,
        } = useFormMechanics({
            entityId: store.current?.id,
            navigation: {
                listPath: "/shipping-orders",
                entityPath: (id) => `/shipping-order/${id}?tab=1`,
                nextTabPath: (id) => `/shipping-order/${id}?tab=2`,
            },
            onCreate: async (data) => {
                const model = await store.create(mapFormToCreateDTO(shippingOrderId, data));
                await store.setCurrent(model.id);
                viewStore.addAlert({
                    alertMode: "success",
                    message: "ShippingOrderTransport:dialog.createSuccess",
                });

                return store.parentId;
            },
            onUpdate: async (id, data) => {
                await store.update(mapFormToUpdateDTO(id, shippingOrderId, data));
                await store.setCurrent(id);
                viewStore.addAlert({
                    alertMode: "success",
                    message: "ShippingOrderTransport:dialog.editSuccess",
                });

                return store.parentId;
            },
        });

        const [form, setForm] = useState<UseForm>();
        const [formVehicleInfo, setFormVehicleInfo] = useState<IVehicleInfo>({});
        const [formDriverInfo, setFormDriverInfo] = useState<IDriverInfo>({});

        useEffect(() => {
            setFormVehicleInfo({
                id: store.current?.vehicleInfo?.id,
                trailerNumberDisabled: !store.current?.vehicleInfo?.withTrailer,
            });

            setFormDriverInfo({
                id: store.current?.driverInfo?.id,
                phoneNumber: store.current?.driverInfo?.phoneNumber ?? undefined,
                POANumber: store.current?.driverInfo?.POANumber ?? undefined,
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [store.current]);

        useEffect(() => {
            setFormDriverInfo({
                id: store.current?.driverInfo?.id,
                phoneNumber: store.current?.driverInfo?.phoneNumber ?? undefined,
                POANumber: store.current?.driverInfo?.POANumber ?? undefined,
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [store.current]);

        const handleDrawerClose = ({
            submitted,
            data,
            component,
        }: {
            submitted?: boolean;
            data?: unknown;
            component: React.FC<IDrawerForm>;
        }) => {
            switch (component) {
                case ClientVehicleForm:
                    if (submitted) {
                        form!.setValue("vehicle", data);
                        form!.setValue(
                            "vehicleTrailerNumber",
                            (data as IFullClientVehicle).trailerNumber ?? ""
                        );
                        form!.setValue(
                            "vehicleInsuranceNumber",
                            (data as IFullClientVehicle).insuranceNumber ?? ""
                        );
                        form!.setValue("withTrailer", (data as IFullClientVehicle).withTrailer);
                    }
                    break;
                case ClientDriverForm:
                    if (submitted) {
                        form!.setValue("driver", data);
                        form!.setValue(
                            "driverPOANumber",
                            (data as IFullClientDriver).POANumber ?? ""
                        );
                        form!.setValue(
                            "driverPhoneNumber",
                            (data as IFullClientDriver).phoneNumber ?? ""
                        );
                    }
                    break;
                default:
                    break;
            }
        };

        const handleVehicleFormChange = async (
            data: FieldValues,
            setValue: UseFormSetValue<FieldValues>
        ) => {
            if (data.vehicle?.id === formVehicleInfo.id) {
                return;
            }

            setTimeout(() => {
                setValue("vehicleTrailerNumber", data.vehicle?.trailerNumber ?? "");
                setValue("vehicleInsuranceNumber", data.vehicle?.insuranceNumber ?? "");
                setValue("withTrailer", Boolean(data.vehicle?.trailerNumber ?? false));
            });

            setFormVehicleInfo({
                id: data.vehicle?.id,
            });
        };

        const handleDriverFormChange = async (
            data: FieldValues,
            setValue: UseFormSetValue<FieldValues>
        ) => {
            if (data.driver?.id === formDriverInfo.id) {
                return;
            }

            setValue("driverPOANumber", data.driver?.POANumber ?? "");
            setValue("driverPhoneNumber", data.driver?.phoneNumber ?? "");

            setFormDriverInfo({
                id: data.driver?.id,
            });
        };

        const handleWithTrailerChange = (data: FieldValues) => {
            setFormVehicleInfo({
                id: data.vehicle?.id,
                trailerNumberDisabled: !data.withTrailer,
            });

            if (!data.withTrailer) {
                form?.setValue("vehicleTrailerNumber", "");
            }
        };

        const handleFormStateChange = (state: {
            errors: FieldErrors;
            isValid: boolean;
            isDirty: boolean;
        }) => {
            onStateFormChanged(state);
        };

        const { open, drawer } = useDrawerForm({
            onClose: handleDrawerClose,
        });

        const fields = useMemo(
            () =>
                fieldsConfiguration({
                    defaultModel: store.current,
                    relatedData: {
                        clientId: client.id,
                        vehicleInfo: formVehicleInfo,
                        driverInfo: formDriverInfo,
                    },
                    actions: {
                        onDriverCardOpen: () =>
                            open(ClientDriverForm, {
                                id: formDriverInfo.id,
                                store: store.cardDriver,
                                fieldOptions: isEditFormMode
                                    ? {
                                          code: {
                                              isUpdateDisabled: true,
                                          },
                                          client: {
                                              isCreateDisabled: true,
                                              isUpdateDisabled: true,
                                              value: client,
                                          },
                                          active: {
                                              isCreateDisabled: true,
                                              isUpdateDisabled: true,
                                              value: true,
                                          },
                                      }
                                    : undefined,
                                isReadOnly: !isEditFormMode,
                            }),
                        onVehicleCardOpen: () =>
                            open(ClientVehicleForm, {
                                id: formVehicleInfo.id,
                                store: store.cardVehicle,
                                fieldOptions: isEditFormMode
                                    ? {
                                          code: {
                                              isUpdateDisabled: true,
                                          },
                                          client: {
                                              isCreateDisabled: true,
                                              isUpdateDisabled: true,
                                              value: client,
                                          },
                                          active: {
                                              isCreateDisabled: true,
                                              isUpdateDisabled: true,
                                              value: true,
                                          },
                                      }
                                    : undefined,
                                isReadOnly: !isEditFormMode,
                            }),
                    },
                }),
            [client, formDriverInfo, formVehicleInfo, isEditFormMode, open, store]
        );

        return (
            <>
                <IFormComponent
                    fields={fields}
                    isLoading={isLoading}
                    isEditMode={!isReadOnly && isEditFormMode}
                    ref={formComponentRef}
                    onSubmit={onSubmitStart}
                    onFormStateChange={handleFormStateChange}
                    onTriggerFieldsChange={{
                        vehicle: handleVehicleFormChange,
                        driver: handleDriverFormChange,
                        withTrailer: handleWithTrailerChange,
                    }}
                    onLoad={setForm}
                />
                <Footer
                    buttons={(classes) =>
                        !isReadOnly && (
                            <EditFormButtons
                                isEditMode={isEditFormMode}
                                isSaveAllowed={formState.isDirty}
                                isLoading={isLoading}
                                onEdit={onEdit}
                                onNext={onNextClick}
                                onSave={onClickSave}
                                onCancel={onFormEditCancel}
                                className={classes.button}
                                withNavigation
                                permissionPath={"ShippingOrder.ShippingOrderTransport"}
                            />
                        )
                    }
                />
                {drawer}
                {PromptElements}
            </>
        );
    }
);

export default ShippingOrderTransport;
