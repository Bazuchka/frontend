import { observer } from "mobx-react";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogAction, IModal } from "src/shared/UI/iModal";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { viewStore } from "src/app/store";
import { ClientGoodUpload } from "src/features/ClientGood/UI/ClientGoodUpload";
import { ClientGoodUploadResult } from "src/features/ClientGood/store/ClientGoodStore/ClientGoodStore";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, useTheme } from "@mui/material";
import { useStyles } from "./styles";

interface ClientGoodUploadDialog {
    modalIsOpen: boolean;
    setModalIsOpen: (open: boolean) => void;

    onUploadFile: (file: File, clientId: string) => Promise<ClientGoodUploadResult>;
    onUploadComplete: () => Promise<void>;
}

const ClientGoodUploadDialog: FunctionComponent<ClientGoodUploadDialog> = observer((props) => {
    const { modalIsOpen, setModalIsOpen, onUploadFile, onUploadComplete } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [file, setFile] = useState<File>();
    const [client, setClient] = useState<ChosenSelectObject>();
    const [isClientError, setClientError] = useState<boolean>(false);
    const [isFileError, setFileError] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const onUploadClick = async () => {
        if (!file) {
            setFileError(true);
        }

        if (!client) {
            setClientError(true);
        }

        if (file && client) {
            setFileError(false);
            setClientError(false);
            setIsUploading(true);

            try {
                const uploadResults = await onUploadFile(file, client?.id);
                if (uploadResults.errors && uploadResults.errors.length) {
                    viewStore.addAlert({
                        alertMode: "error",
                        message: uploadResults.errors.join("\\n"),
                        closeTime: 0,
                    });
                } else {
                    viewStore.addAlert({
                        alertMode: "success",
                        message: "ClientGood:dialog.uploadSuccess",
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setModalIsOpen(false);
                setFile(undefined);
                setClient(undefined);
                setIsUploading(false);
                await onUploadComplete();
            }
        }
    };

    const onCancelClick = () => {
        setIsUploading(false);
        setFileError(false);
        setClientError(false);
        setModalIsOpen(false);
        setFile(undefined);
        setClient(undefined);
    };

    const dialogActions: DialogAction[] = [
        {
            label: t("Action:upload"),
            onClick: onUploadClick,
            loading: isUploading,
            disabled: isUploading,
        },
        {
            label: t("Action:cancel"),
            onClick: onCancelClick,
            disabled: isUploading,
        },
    ];

    const renderButtons = (action: DialogAction) => {
        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <LoadingButton
                key={action.label}
                className={classes.button}
                disabled={action.disabled}
                type={action.type ? action.type : "button"}
                form={action.form ? action.form : null}
                loading={action.loading}
                onClick={action.onClick}>
                {action.label}
            </LoadingButton>
        );
    };

    return (
        <IModal
            open={modalIsOpen}
            settings={{ PaperProps: { style: { backgroundColor: "#F5F5F5" } } }}
            content={
                <Box className={classes.rootBox}>
                    <Typography variant="h5" className={classes.title}>
                        {t("upload.uploadFileAction", { ns: "ClientGood" }) || ""}
                    </Typography>
                    <Box className={classes.form}>
                        <ClientGoodUpload
                            client={client!}
                            file={file!}
                            onClientChange={setClient}
                            onFileChange={setFile}
                            isClientError={isClientError}
                            isFileError={isFileError}
                        />
                        {dialogActions.map(renderButtons)}
                    </Box>
                </Box>
            }
        />
    );
});

export default ClientGoodUploadDialog;
