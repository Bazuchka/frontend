import { SvgIcon } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { PencilIcon, PlusIcon } from "src/assets/svg";
import { IAlisFormActionComponentProps } from "src/features/common/AlisForm/AlisForm";

export const CreateButton: FC<IAlisFormActionComponentProps> = ({ classes, onAction }) => (
    <button
        className={classes?.buttons}
        title={t("Action:create")}
        onClick={() => onAction?.()}
        data-test-id="inline-button:create">
        <SvgIcon component={PlusIcon} />
    </button>
);

export const EditButton: FC<IAlisFormActionComponentProps> = ({ classes, onAction }) => (
    <button
        className={classes?.buttons}
        title={t("Action:edit")}
        onClick={() => onAction?.()}
        data-test-id="inline-button:edit">
        <SvgIcon component={PencilIcon} />
    </button>
);
