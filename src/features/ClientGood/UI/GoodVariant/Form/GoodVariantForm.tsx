import { observer } from "mobx-react";
import { FC, useMemo } from "react";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import clientGoodStore from "../../../store/ClientGoodStore";
import { fieldsConfiguration } from "./configs";
import { v4 as uuidv4 } from "uuid";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { Instance } from "mobx-state-tree";
import { FieldOptions } from "src/shared/hooks/useDrawerForm";

interface GoodVariantFormProps {
    store: Instance<ReturnType<typeof createBaseStore>>;
    id?: string;
    fieldOptions?: FieldOptions;
    onClose?: (submited?: boolean, data?: unknown) => void;
}

const GoodVariantForm: FC<GoodVariantFormProps> = observer(
    ({ id, store, fieldOptions, onClose }) => {
        const {
            isEditFormMode,
            isLoading,
            onEdit,
            onFormEditCancel,
            formState,
            PromptElements,
            onClickSave,
            onSubmitStart,
            onStateFormChanged,
            formComponentRef,
        } = useFormMechanics({
            entityId: id,
            navigation: {
                listPath: `/client-goods`,
                entityPath: (id) => `/client-good/${id}`,
                createLeadsToList: false,
                navigateActions: onClose!,
            },
            onCreate: async (data) => {
                const variant = await store.create({
                    ...data,
                    name: `${clientGoodStore.current?.code} ${data.code}`,
                    goodItem: clientGoodStore.current?.item,
                    syncId: uuidv4(),
                });
                viewStore.addAlert({
                    alertMode: "success",
                    message: "GoodVariant:dialog.createSuccess",
                });

                await store.setCurrent(variant!.id);
                return variant?.id;
            },
            onUpdate: async (id, data) => {
                const variant = await store.update({
                    ...data,
                    id: id!,
                    name: `${clientGoodStore.current?.code} ${data.code}`,
                    goodItem: clientGoodStore.current?.item,
                });
                await store.setCurrent(id!);
                viewStore.addAlert({
                    alertMode: "success",
                    message: "GoodVariant:dialog.editSuccess",
                });

                return variant?.id;
            },
        });

        const current = store.current;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fields = useMemo(
            () => fieldsConfiguration(current, fieldOptions),
            [fieldOptions, current]
        );

        return (
            <>
                <IFormComponent
                    isWaitingStore={clientGoodStore.state.isLoading}
                    fields={fields}
                    isLoading={false}
                    isEditMode={isEditFormMode}
                    ref={formComponentRef}
                    onSubmit={onSubmitStart}
                    onFormStateChange={onStateFormChanged}
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
    }
);

export default GoodVariantForm;
