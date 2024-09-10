import { FC } from "react";
import { IAlisFormActionComponentProps } from "src/features/common/AlisForm/AlisForm";
import { t } from "i18next";
import { PencilIcon, PlusIcon } from "src/assets/svg";
import { SvgIcon } from "@mui/material";

export const CreateButton: FC<IAlisFormActionComponentProps> = ({ classes, onAction }) => (
    <button className={classes?.buttons} title={t("Action:create")} onClick={() => onAction?.()}>
        <SvgIcon component={PlusIcon} />
    </button>
);

export const EditButton: FC<IAlisFormActionComponentProps> = ({ classes, onAction }) => (
    <button className={classes?.buttons} title={t("Action:edit")} onClick={() => onAction?.()}>
        <SvgIcon component={PencilIcon} />
    </button>
);
