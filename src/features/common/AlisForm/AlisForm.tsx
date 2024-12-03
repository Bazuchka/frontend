import { useTheme } from "@mui/material";
import { Classes } from "jss";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FC } from "react";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { IUseAlisFormComponentProps, useAlisForm } from "src/shared/hooks/useAlisForm";
import { DialogPrompt } from "src/shared/UI/DialogPrompt";
import { useStyles } from "./styles";

export interface IAlisFormActionComponentProps {
    classes?: Classes;
    onAction?: () => void;
}

export interface IAlisFormComponentProps {
    onClose: (submited?: boolean) => void;
    onFormStateChange?: (isDirty: boolean) => void;
    componentProps?: IUseAlisFormComponentProps;
    id?: string;
    store: Instance<ReturnType<typeof createBaseStore>>;
}

interface AlisFormProps {
    id?: string;
    store: Instance<ReturnType<typeof createBaseStore>>;
    loadData?: boolean;
    showImmediately?: boolean;
    allowEdit?: boolean;
    allowCreate?: boolean;
    allowDelete?: boolean;
    componentProps?: IUseAlisFormComponentProps;
    component?: FC<IAlisFormComponentProps>;
    createActionComponents?: FC<IAlisFormActionComponentProps>;
    onCreateAction?: () => void;
    editActionComponents?: FC<IAlisFormActionComponentProps>;
    onEditAction?: () => void;
    initComponent?: (store: Instance<ReturnType<typeof createBaseStore>>) => void;
}

const AlisForm: FC<AlisFormProps> = observer((props) => {
    const {
        id,
        allowCreate,
        allowEdit,
        store,
        createActionComponents,
        onCreateAction,
        editActionComponents,
        onEditAction,
        component,
        initComponent,
    } = props;
    const { editPromptModalRef, close, open, drawer } = useAlisForm(props);

    const theme = useTheme();
    const classes = useStyles({ theme });

    initComponent && initComponent(store);
    const openDrawer = (id?: string) => {
        component && open(component as FC, { id, store });
    };

    return (
        <>
            {allowCreate &&
                createActionComponents &&
                createActionComponents({
                    onAction: async () => {
                        onCreateAction && onCreateAction();

                        await store.setCurrent(null);

                        openDrawer();
                    },
                    classes: classes,
                })}
            {allowEdit &&
                editActionComponents &&
                editActionComponents({
                    onAction: async () => {
                        onEditAction && onEditAction();

                        if (id) {
                            await store.setCurrent(id);
                        }

                        openDrawer(id);
                    },
                    classes: classes,
                })}
            <DialogPrompt onProceed={close} ref={editPromptModalRef} />
            {drawer}
        </>
    );
});

export default AlisForm;
