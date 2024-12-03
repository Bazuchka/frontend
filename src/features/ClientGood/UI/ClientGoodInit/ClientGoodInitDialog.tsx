import { observer } from "mobx-react";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogAction, IModal } from "src/shared/UI/iModal";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { useNavigate } from "react-router-dom";
import { ClientGoodInit } from "src/features/ClientGood/UI/ClientGoodInit";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import IFormGroup from "../../../../shared/UI/iFormGroup/IFormGroup";
import clientGoodStore from "../../store/ClientGoodStore";

interface ClientGoodInitDialogProps {
    modalIsOpen: boolean;
    setModalIsOpen: (open: boolean) => void;
}

const ClientGoodInitDialog: FunctionComponent<ClientGoodInitDialogProps> = observer((props) => {
    const { modalIsOpen, setModalIsOpen } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [isClientError, setClientError] = useState<boolean>(false);
    const [isClientGoodError, setClientGoodError] = useState<boolean>(false);
    const [isClientGoodTypeError, setClientGoodTypeError] = useState<boolean>(false);

    const [client, setClient] = useState<ChosenSelectObject>();
    const [goodType, setGoodType] = useState<ChosenSelectObject>();
    const [clientGoodType, setClientGoodType] = useState<ChosenSelectObject>();
    const navigate = useNavigate();

    const onContinueClick = async () => {
        if (!client) {
            setClientError(true);
        }

        if (!goodType) {
            setClientGoodError(true);
        }

        if (!clientGoodType) {
            setClientGoodTypeError(true);
        }

        if (client && goodType && clientGoodType) {
            clientGoodStore.init(client, goodType, clientGoodType);
            navigate("/client-good/create");
        }
    };

    const onCancelClick = () => {
        setClientError(false);
        setModalIsOpen(false);
        setClient(undefined);
    };

    const dialogActions: DialogAction[] = [
        {
            label: t("Action:continue"),
            onClick: onContinueClick,
        },
        {
            label: t("Action:cancel"),
            onClick: onCancelClick,
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
            settings={{ PaperProps: { style: { backgroundColor: "#F5F5F5", minWidth: "850px" } } }}
            content={
                <Box className={classes.rootBox}>
                    <Typography variant="h5" className={classes.title}>
                        {t("init.initAction", { ns: "ClientGood" }) || ""}
                    </Typography>
                    <Box className={classes.form}>
                        <IFormGroup
                            label={t("properties.goodProperties", { ns: "ClientGood" }) || ""}>
                            <ClientGoodInit
                                isClientError={isClientError}
                                isClientGoodError={isClientGoodError}
                                isClientGoodTypeError={isClientGoodTypeError}
                                client={client!}
                                goodType={goodType!}
                                clientGoodType={clientGoodType!}
                                onClientChange={setClient}
                                onGoodTypeChange={setGoodType}
                                onClientGoodTypeChange={setClientGoodType}
                            />
                        </IFormGroup>
                        {dialogActions.map(renderButtons)}
                    </Box>
                </Box>
            }
        />
    );
});

export default ClientGoodInitDialog;
