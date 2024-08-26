import { observer } from "mobx-react";
import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import { v4 as uuidv4 } from "uuid";
import clientGoodStore from "../../store/ClientGoodStore";
import { fieldsConfiguration } from "./configs";
import { FieldValues } from "react-hook-form";

interface ClientGoodProps {}

const ClientInfo: FC<ClientGoodProps> = observer((): JSX.Element => {
    const { id } = useParams();

    const {
        isEditFormMode,
        formState,
        isLoading,
        onEdit,
        onFormEditCancel,
        PromptElements,
        onClickSave,
        onSubmitStart,
        onStateFormChanged,
        formComponentRef,
    } = useFormMechanics({
        entityId: id,
        navigation: {
            listPath: "/client-goods",
            entityPath: (id) => `/client-good/${id}`,
        },
        onCreate: async (data) => {
            const clientGood = await clientGoodStore.create({
                ...data,
                price: data.price ? parseFloat(data.price) : null,
                shelfLife: data.shelfLife ? parseInt(data.shelfLife, 10) : null,
                syncId: uuidv4(),
            });
            await clientGoodStore.setCurrent(clientGood.id);
            viewStore.addAlert({
                alertMode: "success",
                message: "ClientGood:dialog.createSuccess",
            });

            return clientGood.id;
        },
        onUpdate: async (id, data) => {
            await clientGoodStore.update({
                ...data,
                id: id!,
                price: data.price ? parseFloat(data.price) : null,
                shelfLife: data.shelfLife ? parseInt(data.shelfLife, 10) : null,
            });
            await clientGoodStore.setCurrent(id!);
            viewStore.addAlert({
                alertMode: "success",
                message: "ClientGood:dialog.editSuccess",
            });
        },
    });

    const [isVariable, setFormIsVariable] = useState<boolean>(true);

    const handleClientGoodTypeFormChange = async (data: FieldValues) => {
        setFormIsVariable(data.clientGoodType?.isVariable);
    };

    const fields = useMemo(
        () => fieldsConfiguration(isEditFormMode, isVariable),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isEditFormMode, isVariable, clientGoodStore.current]
    );

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
                    clientGoodType: handleClientGoodTypeFormChange,
                }}
            />
            <Footer
                buttons={(classes) => (
                    <EditFormButtons
                        isEditMode={isEditFormMode}
                        isSaveAllowed={formState.isDirty}
                        isLoading={clientGoodStore.state.isLoading || isLoading}
                        onEdit={onEdit}
                        onSave={onClickSave}
                        onCancel={onFormEditCancel}
                        className={classes.button}
                        permissionPath={"ClientGood"}
                    />
                )}
            />
            {PromptElements}
        </>
    );
});

export default ClientInfo;
