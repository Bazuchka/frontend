import { t } from "i18next";
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import { DialogAction, IModal } from "../iModal";

interface EditPromptProps {
    onProceed: () => void;
    onReset?: () => void;
}

export type ShowPromptHandle = {
    show: (action?: string) => void;
};

const DialogPrompt = (
    { onProceed, onReset }: EditPromptProps,
    ref: ForwardedRef<ShowPromptHandle>
) => {
    const [promptProps, setPromptProps] = useState<{ action?: string; isOpen: boolean }>({
        isOpen: false,
    });
    const dialogActions: DialogAction[] = [
        {
            label: t("Action:yes"),
            onClick: () => {
                onProceed();
                setPromptProps({ isOpen: false });
            },
        },
        {
            label: t("Action:no"),
            onClick: () => {
                onReset?.();
                setPromptProps({ isOpen: false });
            },
        },
    ];

    const show = (action?: string) => {
        setPromptProps({ isOpen: true, action });
    };

    useImperativeHandle(ref, () => {
        return {
            show,
        };
    });

    return (
        <IModal
            title={promptProps.action ? t(promptProps.action, { ns: "Dialog" }) : ""}
            open={promptProps.isOpen}
            dialogActions={dialogActions}
        />
    );
};

export default forwardRef(DialogPrompt);
