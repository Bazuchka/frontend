import { observer } from "mobx-react";
import { FC, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import useContractSelector from "src/shared/hooks/useContactSelector";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import { v4 as uuidv4 } from "uuid";
import { termOfServiceStore } from "../../store/TermOfServiceStore";
import { fieldsConfiguration } from "./configs";

interface TermOfServiceProps {}

const TermOfService: FC<TermOfServiceProps> = observer((): JSX.Element => {
    const { id } = useParams();
    const {
        isEditFormMode,
        formState,
        onEdit,
        onFormEditCancel,
        PromptElements,
        onStateFormChanged,
        onClickSave,
        onSubmitStart,
        formComponentRef,
    } = useFormMechanics({
        entityId: id,
        navigation: {
            listPath: "/term-of-services",
            entityPath: (id) => `/term-of-service/${id}`,
        },
        onCreate: async (data) => {
            const termOfService = await termOfServiceStore.create({
                ...data,
                syncId: uuidv4(),
            });
            viewStore.addAlert({
                alertMode: "success",
                message: "TermOfService:dialog.createSuccess",
            });

            return termOfService.id;
        },
        onUpdate: async (id, data) => {
            await termOfServiceStore.update({
                ...data,
                id: id!,
            });
            await termOfServiceStore.setCurrent(id!);
            viewStore.addAlert({
                alertMode: "success",
                message: "TermOfService:dialog.editSuccess",
            });
        },
    });

    const {
        onClientChange,
        onLegalEntityChange,
        onContractChange,
        selectedData: filters,
    } = useContractSelector(isEditFormMode, {
        legalEntity: termOfServiceStore.current?.legalEntity ?? null,
        client: termOfServiceStore.current?.client ?? null,
        contract: termOfServiceStore.current?.contract ?? null,
    });

    const [validToIsEditable, setValidToIsEditable] = useState(
        !termOfServiceStore.current?.indefinitely
    );

    const onIndefinitelyChange = (values: FieldValues) => {
        setValidToIsEditable(!values.indefinitely);
    };

    const fields = useMemo(() => {
        return fieldsConfiguration({
            filters,
            validToIsEditable,
            defaultModel: termOfServiceStore.current,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, validToIsEditable, termOfServiceStore.current]);

    return (
        <>
            <IFormComponent
                isWaitingStore={termOfServiceStore.state.isLoading}
                fields={fields}
                isLoading={termOfServiceStore.state.isLoading}
                isEditMode={isEditFormMode}
                ref={formComponentRef}
                onSubmit={onSubmitStart}
                onFormStateChange={onStateFormChanged}
                onTriggerFieldsChange={{
                    client: onClientChange,
                    legalEntity: onLegalEntityChange,
                    contract: onContractChange,
                    indefinitely: onIndefinitelyChange,
                }}
            />
            <Footer
                buttons={(classes) => (
                    <EditFormButtons
                        isEditMode={isEditFormMode}
                        isSaveAllowed={formState.isDirty}
                        isLoading={termOfServiceStore.state.isLoading}
                        onEdit={onEdit}
                        onSave={onClickSave}
                        onCancel={onFormEditCancel}
                        className={classes.button}
                        permissionPath={"TermOfService"}
                    />
                )}
            />
            {PromptElements}
        </>
    );
});

export default TermOfService;
