import { observer } from "mobx-react";
import { FC, useCallback, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import useContractSelector from "src/shared/hooks/useContactSelector";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { fieldsConfiguration } from "./configs";
import { mapFormToCreateDTO, mapFormToUpdateDTO } from "./mapper";

interface ShippingOrderProps {
    isReadOnly: boolean;
}

const ShippingOrderInfo: FC<ShippingOrderProps> = observer(({ isReadOnly }): JSX.Element => {
    const { id } = useParams();
    const {
        isCreate,
        isLoading,
        isEditFormMode,
        formState,
        formComponentRef,
        onEdit,
        onFormEditCancel,
        onSubmitStart,
        onNextClick,
        PromptElements,
        onStateFormChanged,
        onClickSave,
    } = useFormMechanics({
        entityId: id,
        navigation: {
            listPath: "/shipping-orders",
            entityPath: (id) => `/shipping-order/${id}`,
            nextTabPath: (id) => `/shipping-order/${id}?tab=1`,
        },
        onCreate: async (data) => {
            const shippingOrder = await shippingOrderStore.create(mapFormToCreateDTO(data));

            viewStore.addAlert({
                alertMode: "success",
                message: "ShippingOrder:dialog.createSuccess",
            });
            return shippingOrder.id;
        },
        onUpdate: async (id, data) => {
            await shippingOrderStore.update(mapFormToUpdateDTO(id!, data));
            await shippingOrderStore.setCurrent(id!);
            viewStore.addAlert({
                alertMode: "success",
                message: "ShippingOrder:dialog.editSuccess",
            });

            return id;
        },
    });

    const {
        onClientChange,
        onLegalEntityChange,
        onContractChange,
        selectedData: filters,
    } = useContractSelector(isEditFormMode, {
        legalEntity: shippingOrderStore.current?.legalEntity ?? null,
        client: shippingOrderStore.current?.client ?? null,
        contract: shippingOrderStore.current?.contract ?? null,
    });

    const [terminalArea, setTerminalArea] = useState<string>();

    const fields = useMemo(
        () =>
            fieldsConfiguration({
                isCreate,
                isEdit: isEditFormMode,
                filters: {
                    ...filters,
                    terminalArea,
                },
                defaultModel: shippingOrderStore.current,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters, isCreate, shippingOrderStore.current]
    );

    const onTerminalAreaChange = useCallback((values: FieldValues) => {
        setTerminalArea(values.terminalArea);
    }, []);

    return (
        <>
            <IFormComponent
                fields={fields}
                isLoading={isLoading}
                isEditMode={isEditFormMode}
                ref={formComponentRef}
                onSubmit={onSubmitStart}
                onFormStateChange={onStateFormChanged}
                onTriggerFieldsChange={{
                    client: onClientChange,
                    legalEntity: onLegalEntityChange,
                    contract: onContractChange,
                    terminalArea: onTerminalAreaChange,
                }}
            />
            <Footer
                buttons={(classes) =>
                    !isReadOnly && (
                        <EditFormButtons
                            isEditMode={isEditFormMode}
                            isSaveAllowed={formState.isDirty}
                            isLoading={isLoading || shippingOrderStore.state.isLoading}
                            onEdit={onEdit}
                            onSave={onClickSave}
                            onNext={onNextClick}
                            onCancel={onFormEditCancel}
                            className={classes.button}
                            permissionPath={"ShippingOrder"}
                            withNavigation
                        />
                    )
                }
            />
            {PromptElements}
        </>
    );
});

export default ShippingOrderInfo;
