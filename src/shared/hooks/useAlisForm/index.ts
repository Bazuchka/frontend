import { Instance } from "mobx-state-tree";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShowPromptHandle } from "src/shared/UI/DialogPrompt";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { DIALOG_ACTION } from "src/shared/enums/enums";
import { IDrawerForm, useDrawerForm } from "src/shared/hooks/useDrawerForm";

export interface IUseAlisFormComponentProps {
    getValue: (key: string) => Record<string, string | object | undefined>;
    setValue: (key: string, value: unknown) => void;
}

export interface IUseAlisFormParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: Instance<ReturnType<typeof createBaseStore>>;
    handleSubmitted?: (data: unknown | undefined) => void;
    loadData?: boolean;
    showImmediately?: boolean;
    componentProps?: IUseAlisFormComponentProps;
}

export const useAlisForm = ({ loadData, store, componentProps }: IUseAlisFormParams) => {
    const editPromptModalRef = useRef<ShowPromptHandle>(null);
    const [isDirty, setIsDirty] = useState(false);

    const handleClose = ({
        submitted,
    }: {
        submitted?: boolean;
        component: React.FC<IDrawerForm>;
    }) => {
        if (!isDirty || submitted) {
            submitted && loadData && store.fetch();
            close();
        } else {
            editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
        }
    };

    const handleFormStateChange = useCallback((isDirty: boolean) => {
        setIsDirty(isDirty);
    }, []);

    const { open, drawer, close } = useDrawerForm({
        onClose: handleClose,
        onFormStateChange: handleFormStateChange,
        componentProps: componentProps,
    });

    useEffect(() => {
        if (loadData) {
            store.fetch();
        }
    }, [store, loadData]);

    return {
        close,
        handleFormStateChange,
        editPromptModalRef,
        open,
        drawer,
    };
};
