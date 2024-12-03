import { observer } from "mobx-react";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { viewStore } from "src/app/store";
import EditFormButtons from "src/shared/UI/TSBaseTable/UI/EditFormButtons";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { Footer } from "src/shared/UI/iFormComponent/UI/Footer";
import useFormMechanics from "src/shared/hooks/useFormMechanics";
import userStore from "src/features/Administration/Users/store/UserStore";
import { fieldsConfiguration } from "./configs";

interface UserInfoProps {}

const UserInfo: FC<UserInfoProps> = observer((): JSX.Element => {
    const { id } = useParams();

    const {
        isEditFormMode,
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
            listPath: "/users",
            entityPath: (id) => `/users/${id}`,
            createLeadsToList: true,
        },
        onCreate: async (data) => {
            const clientGood = await userStore.create(
                {
                    ...data,
                },
                { serviceUrl: "/user" }
            );
            viewStore.addAlert({
                alertMode: "success",
                message: "User:dialog.user.createSuccess",
            });

            return clientGood.id;
        },
        onUpdate: async (id, data) => {
            await userStore.update({
                ...data,
                id: id!,
                /* 
                todo потом сделать опционально:
                передавать true, если поменялись только: Имя, Полное имя, Фамилия, пароль
                передавать false, если поменялись любые остальные поля
                */
                partialUpdate: false,
            });
            await userStore.setCurrent(id!);
            viewStore.addAlert({
                alertMode: "success",
                message: "User:dialog.user.editSuccess",
            });
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fields = useMemo(() => fieldsConfiguration(), [userStore.current]);

    return (
        <>
            <IFormComponent
                isWaitingStore={userStore.state.isLoading}
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
                        isLoading={userStore.state.isLoading || isLoading}
                        onEdit={onEdit}
                        onSave={onClickSave}
                        onCancel={onFormEditCancel}
                        className={classes.button}
                        permissionPath={"User"}
                    />
                )}
            />
            {PromptElements}
        </>
    );
});

export default UserInfo;
