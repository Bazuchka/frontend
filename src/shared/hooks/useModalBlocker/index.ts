import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface UseModalBlockerProps {
    isEditMode: boolean;
}

export function useModalBlocker(options: UseModalBlockerProps) {
    const { isEditMode } = options;
    const { t } = useTranslation();
    const [shouldBlock, setShouldBlock] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const blocker = useBlocker(shouldBlock);

    useEffect(() => {
        isEditMode ? setShouldBlock(true) : setShouldBlock(false);
        if (blocker.state === "blocked") {
            setShowModal(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocker.location?.pathname, isEditMode]);

    const handleCancel = () => {
        setShowModal(false);
        blocker.reset?.();
    };

    const handleOk = () => {
        setShowModal(false);
        blocker.proceed?.();
    };

    const dialogActions = [
        { label: t("Action:yes"), onClick: handleOk },
        { label: t("Action:cancel"), onClick: handleCancel },
    ];

    const title = t("Shared:AttentionMessage");

    return {
        showModal,
        title,
        dialogActions,
        handleOk,
        handleCancel,
    };
}
