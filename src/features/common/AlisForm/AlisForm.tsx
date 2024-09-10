import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FC } from "react";
import { useTheme } from "@mui/material";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { DialogPrompt } from "src/shared/UI/DialogPrompt";
import { IUseAlisFormComponentProps, useAlisForm } from "src/shared/hooks/useAlisForm";
import { useStyles } from "./styles";
import { Classes } from "jss";

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
    const openDrawer = () => {
        component && open(component as FC, { store: store });
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

                        openDrawer();
                    },
                    classes: classes,
                })}
            <DialogPrompt onProceed={close} ref={editPromptModalRef} />
            {drawer}
        </>
    );
});

export default AlisForm;
