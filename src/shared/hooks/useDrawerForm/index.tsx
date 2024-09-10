import { Instance } from "mobx-state-tree";
import { createElement, useCallback, useMemo, useRef, useState } from "react";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { IDrawer } from "src/shared/UI/IDrawer";

export type FieldOptions = {
    [field: string]: {
        isUpdateDisabled?: boolean;
        isCreateDisabled?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value?: any;
    };
};

export interface IDrawerForm {
    onClose: (submited?: boolean, data?: unknown) => void;
    onFormStateChange?: (isDirty: boolean) => void;
    componentProps?: unknown;
    id?: string;
    store: Instance<ReturnType<typeof createBaseStore>>;
    fieldOptions?: FieldOptions;
    isReadOnly?: boolean;
    isExternalClosing?: boolean;
}

export type ExternalEventsHandle = {
    onClose: () => void;
};

export const useDrawerForm = <T extends IDrawerForm>({
    onClose,
    onFormStateChange,
    componentProps,
    isExternalClosing,
}: {
    onClose: (props: { submitted?: boolean; data?: unknown; component: React.FC<T> }) => void;
    onFormStateChange?: (isDirty: boolean) => void;
    componentProps?: unknown;
    isExternalClosing?: boolean;
}) => {
    const [component, setComponent] = useState<React.FC<T> | null>(null);
    const formRef = useRef<ExternalEventsHandle>(null);
    const [metadata, setMetadata] = useState<{
        id?: string;
        store: Instance<ReturnType<typeof createBaseStore>>;
        fieldOptions?: FieldOptions;
        isReadOnly?: boolean;
    }>();

    const handleOpen = (
        drawerComponent: React.FC<T>,
        metadata: {
            id?: string;
            store: Instance<ReturnType<typeof createBaseStore>>;
            fieldOptions?: FieldOptions;
            isReadOnly?: boolean;
        }
    ) => {
        setComponent(drawerComponent);
        setMetadata(metadata);
    };

    const handleCloseDrawer = useCallback(
        (submitted?: boolean, data?: unknown) => {
            onClose({ submitted, data, component: component! });
            if (!isExternalClosing) {
                setComponent(null);
            }
        },
        [component, isExternalClosing, onClose]
    );

    const handleCloseIconClick = useCallback(
        (submitted?: boolean, data?: unknown) => {
            formRef.current?.onClose();
            onClose({ submitted, data, component: component! });
        },
        [component, onClose, formRef]
    );

    const closeDrawer = useCallback(() => {
        setComponent(null);
    }, []);

    const componentNode = useMemo(() => {
        if (component === null) {
            return null;
        }

        return createElement(component, {
            onClose: handleCloseDrawer,
            onFormStateChange: onFormStateChange,
            componentProps: componentProps,
            id: metadata?.id,
            store: metadata?.store,
            fieldOptions: metadata?.fieldOptions,
            isReadOnly: metadata?.isReadOnly,
            ref: formRef,
        } as unknown as T);
    }, [
        component,
        handleCloseDrawer,
        onFormStateChange,
        componentProps,
        metadata?.id,
        metadata?.store,
        metadata?.fieldOptions,
        metadata?.isReadOnly,
    ]);

    return {
        open: handleOpen,
        close: closeDrawer,
        drawer: (
            <IDrawer open={!!component} onCloseIconClick={handleCloseIconClick}>
                {componentNode}
            </IDrawer>
        ),
    };
};

export const isFieldDisabled: <Prop extends keyof FieldOptions>(
    isCreate: boolean,
    fieldOptions?: FieldOptions[Prop]
) => boolean = (isCreate, fieldOptions) => {
    if (isCreate && fieldOptions?.isCreateDisabled) {
        return true;
    } else if (!isCreate && fieldOptions?.isUpdateDisabled) {
        return true;
    }

    return false;
};
