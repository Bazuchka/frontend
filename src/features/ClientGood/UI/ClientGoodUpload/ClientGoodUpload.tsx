import { Grid, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FilePicker } from "src/shared/UI/FilePicker";
import FieldLabel from "src/shared/UI/iFieldItem/FieldLabel";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";

interface ClientGoodUploadProps {
    onFileChange: (file?: File) => void;
    onClientChange: (client?: ChosenSelectObject) => void;

    file?: File;
    client?: ChosenSelectObject;

    isFileError: boolean;
    isClientError: boolean;
}

const ClientGoodUpload: FunctionComponent<ClientGoodUploadProps> = observer((props) => {
    const { onFileChange, onClientChange, file, client, isFileError, isClientError } = props;

    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    const fileUploadHandler = (file: File) => {
        onFileChange(file);
    };

    return (
        <>
            <Grid container alignItems="center" spacing={2} columns={12}>
                <Grid item xs={4}>
                    <FieldLabel
                        label={t("upload.chooseFile", { ns: "ClientGood" }) || ""}
                        fieldName={"upload"}
                        className={classes.label}
                    />
                </Grid>
                <Grid item xs={8}>
                    <FilePicker
                        onFileLoad={fileUploadHandler}
                        selectedFileName={file?.name}
                        accept={".xlsx, .xls"}
                        error={isFileError}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FieldLabel
                        label={t("upload.chooseClient", { ns: "ClientGood" }) || ""}
                        fieldName={"upload"}
                        className={classes.label}
                    />
                </Grid>
                <Grid item xs={8}>
                    <AutocompleteSelectOfDictionary
                        isDisable={false}
                        value={client!}
                        renderValuePrimary="name"
                        error={isClientError}
                        onValueChange={(data) => onClientChange(data!)}
                        dictionaryParams={{ type: DictionaryType.CLIENT }}
                    />
                </Grid>
            </Grid>
        </>
    );
});

export default ClientGoodUpload;
