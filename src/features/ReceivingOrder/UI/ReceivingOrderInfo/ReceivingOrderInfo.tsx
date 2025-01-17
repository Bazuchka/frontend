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
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { fieldsConfiguration } from "./configs";
import { mapFormToCreateDTO, mapFormToUpdateDTO } from "./mapper";

interface ReceivingOrderProps {
    isReadOnly: boolean;
}

const ReceivingOrderInfo: FC<ReceivingOrderProps> = observer(({ isReadOnly }): JSX.Element => {
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
        PromptElements,
        onStateFormChanged,
        onClickSave,
        onNextClick,
    } = useFormMechanics({
        entityId: id,
        navigation: {
            listPath: "/receiving-orders",
            entityPath: (id) => `/receiving-order/${id}`,
            nextTabPath: (id) => `/receiving-order/${id}?tab=1`,
        },
        onCreate: async (data) => {
            const receivingOrder = await receivingOrderStore.create(mapFormToCreateDTO(data));

            viewStore.addAlert({
                alertMode: "success",
                message: "ReceivingOrder:dialog.createSuccess",
            });
            return receivingOrder.id;
        },
        onUpdate: async (id, data) => {
            await receivingOrderStore.update(mapFormToUpdateDTO(id!, data));
            await receivingOrderStore.setCurrent(id!);
            viewStore.addAlert({
                alertMode: "success",
                message: "ReceivingOrder:dialog.editSuccess",
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
        legalEntity: receivingOrderStore.current?.legalEntity ?? null,
        client: receivingOrderStore.current?.client ?? null,
        contract: receivingOrderStore.current?.contract ?? null,
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
                defaultModel: receivingOrderStore.current,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters, isCreate, receivingOrderStore.current]
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
                            isLoading={isLoading || receivingOrderStore.state.isLoading}
                            onEdit={onEdit}
                            onSave={onClickSave}
                            onCancel={onFormEditCancel}
                            onNext={onNextClick}
                            className={classes.button}
                            permissionPath={"ReceivingOrder"}
                            withNavigation
                        />
                    )
                }
            />
            {PromptElements}
        </>
    );
});

export default ReceivingOrderInfo;
