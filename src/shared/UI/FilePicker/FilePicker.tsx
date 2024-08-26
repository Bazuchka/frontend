import { FunctionComponent } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Box, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFileUpload } from "src/shared/hooks/useFileUpload";
import { useFileUploadStyles } from "./styles";

interface FileUploadProps {
    selectedFileName?: string;
    onFileLoad?: (data: File) => void;
    accept: string;
    error?: boolean;
}

const FilePicker: FunctionComponent<FileUploadProps> = observer((props): JSX.Element => {
    const { onFileLoad, selectedFileName, accept, error } = props;
    const theme = useTheme();
    const classes = useFileUploadStyles({ theme });

    const { t } = useTranslation();

    const {
        handleFileDragLeave,
        handleFileDragOver,
        handleFileDrop,
        isDropZoneActive,
        handleAddFileButtonClick,
        handleFileInputChange,
        input,
    } = useFileUpload({
        cb: (data) => onFileLoad && onFileLoad(data.file),
    });

    let dropZoneClassName = isDropZoneActive
        ? `${classes.dropZone}  ${classes.dropZoneActive}`
        : classes.dropZone;

    dropZoneClassName = error
        ? `${dropZoneClassName}  ${classes.dropZoneError}`
        : dropZoneClassName;

    return (
        <>
            <Box
                onDragLeave={handleFileDragLeave}
                onDragOver={handleFileDragOver}
                onDrop={handleFileDrop}
                className={dropZoneClassName}
                onClick={handleAddFileButtonClick}>
                <CloudUploadIcon className={classes.icon} />
                {selectedFileName || t("Shared:dragAndDrop")}
                <input
                    ref={input}
                    accept={accept}
                    type="file"
                    className={classes.input}
                    onChange={handleFileInputChange}
                />
            </Box>
        </>
    );
});

export default FilePicker;
