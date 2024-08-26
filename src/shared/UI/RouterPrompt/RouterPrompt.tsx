import { t } from "i18next";
import { FC, useCallback } from "react";
import { BlockerFunction, useBlocker } from "react-router-dom";
import { DialogAction, IModal } from "../iModal";

interface RouterPromptParams {
    when: boolean;
    message?: string;
}

export const RouterPrompt: FC<RouterPromptParams> = ({
    when,
    message = t("cancelAction", { ns: "Dialog" }),
}) => {
    const shouldBlock = useCallback<BlockerFunction>(
        ({ currentLocation, nextLocation }) =>
            when &&
            (currentLocation.pathname !== nextLocation.pathname ||
                currentLocation.search !== nextLocation.search),
        [when]
    );

    const blocker = useBlocker(shouldBlock);

    const dialogActions: DialogAction[] = [
        {
            label: t("Action:yes"),
            onClick: () => blocker.proceed?.(),
        },
        {
            label: t("Action:no"),
            onClick: () => blocker.reset?.(),
        },
    ];

    return (
        <IModal
            title={message || ""}
            open={blocker.state === "blocked"}
            dialogActions={dialogActions}
        />
    );
};
