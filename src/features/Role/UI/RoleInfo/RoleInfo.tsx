import { observer } from "mobx-react";
import { FC, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { viewStore } from "src/app/store";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import roleStore from "../../store/RoleStore";
import { fieldsConfiguration } from "./configs";

interface RoleInfoProps {}

const RoleInfo: FC<RoleInfoProps> = observer((): JSX.Element => {
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
            listPath: "/roles",
            entityPath: (id) => `/roles/${id}`,
        },
        onCreate: async (data) => {
            const clientGood = await roleStore.create(
                {
                    ...data,
                    active: true,
                },
                {
                    serviceUrl: "/role",
                }
            );
            await roleStore.setCurrent(clientGood.id);
            viewStore.addAlert({
                alertMode: "success",
                message: "Role:dialog.createSuccess",
            });

            return clientGood.id;
        },
        onUpdate: async (id, data) => {
            await roleStore.update(
                {
                    ...data,
                    id: id!,
                },
                {
                    serviceUrl: "/role/",
                }
            );
            await roleStore.setCurrent(id!);
            viewStore.addAlert({
                alertMode: "success",
                message: "Role:dialog.editSuccess",
            });
        },
    });

    const [isVariable, setFormIsVariable] = useState<boolean>(true);

    const handleClientGoodTypeFormChange = async (data: FieldValues) => {
        setFormIsVariable(data.clientGoodType?.isVariable);
    };

    const fields = useMemo(
        () => fieldsConfiguration(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isEditFormMode, isVariable, roleStore.current]
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
                        isLoading={roleStore.state.isLoading || isLoading}
                        onEdit={onEdit}
                        onSave={onClickSave}
                        onCancel={onFormEditCancel}
                        className={classes.button}
                        permissionPath={"Role"}
                    />
                )}
            />
            {PromptElements}
        </>
    );
});

export default RoleInfo;
