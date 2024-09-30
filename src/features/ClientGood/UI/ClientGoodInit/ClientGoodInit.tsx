import { FormLabel, Grid, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";

interface ClientGoodInitProps {
    isClientError: boolean;
    isClientGoodError: boolean;
    isClientGoodTypeError: boolean;

    onClientChange: (value?: ChosenSelectObject) => void;
    onGoodTypeChange: (value?: ChosenSelectObject) => void;
    onClientGoodTypeChange: (value?: ChosenSelectObject) => void;

    client?: ChosenSelectObject;
    goodType?: ChosenSelectObject;
    clientGoodType?: ChosenSelectObject;
}

const ClientGoodInit: FunctionComponent<ClientGoodInitProps> = observer((props) => {
    const {
        isClientError,
        isClientGoodError,
        isClientGoodTypeError,
        client,
        goodType,
        clientGoodType,
        onClientChange,
        onGoodTypeChange,
        onClientGoodTypeChange,
    } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    return (
        <>
            <Grid container alignItems="center" spacing={2} columns={12}>
                <Grid item xs={4}>
                    <FormLabel required={true} className={classes.label}>
                        {t("properties.client", { ns: "ClientGood" }) || ""}
                    </FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <AutocompleteSelectOfDictionary
                        isDisable={false}
                        value={client}
                        renderValuePrimary="name"
                        error={isClientError}
                        onValueChange={(data) => onClientChange(data!)}
                        dictionaryParams={{
                            type: DictionaryType.CLIENT,
                            filter: {
                                active: true,
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormLabel required={true} className={classes.label}>
                        {t("properties.goodType", { ns: "ClientGood" }) || ""}
                    </FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <AutocompleteSelectOfDictionary
                        isDisable={false}
                        value={goodType!}
                        error={isClientGoodError}
                        onValueChange={(data) => onGoodTypeChange(data!)}
                        dictionaryParams={{
                            type: DictionaryType.GOOD_TYPE,
                            filter: {
                                active: true,
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormLabel required={true} className={classes.label}>
                        {t("properties.clientGoodType", { ns: "ClientGood" }) || ""}
                    </FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <AutocompleteSelectOfDictionary
                        isDisable={false}
                        value={clientGoodType!}
                        renderValuePrimary="code"
                        error={isClientGoodTypeError}
                        onValueChange={(data) => onClientGoodTypeChange(data!)}
                        dictionaryParams={{
                            type: DictionaryType.CLIENT_GOOD_TYPE,
                            filter: {
                                active: true,
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
});

export default ClientGoodInit;
