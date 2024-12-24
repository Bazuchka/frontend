import { DownloadIcon } from "src/assets/svg";
import { useStyles } from "./styles";
import { ITooltype } from "../iTooltype";
import { t } from "i18next";
import { LoadingButton } from "@mui/lab";

export interface IDownloadButton {
    id: string;
    canShowButton: boolean;
    isDownloading: boolean;
    fetchFileCallback: () => Promise<void>;
    customClasses?: string | null;
    linkReference: React.MutableRefObject<HTMLAnchorElement | null>;
}

export default function DownloadButton({
    id,
    canShowButton,
    isDownloading,
    fetchFileCallback,
    customClasses,
    linkReference,
}: IDownloadButton) {
    const classes = useStyles();
    const wrapperClass = customClasses ? customClasses : "";

    return (
        <div className={wrapperClass}>
            {canShowButton && (
                <ITooltype
                    id={id}
                    item={
                        <LoadingButton
                            onClick={fetchFileCallback}
                            className={classes.button}
                            loading={isDownloading}
                            disabled={isDownloading}>
                            {!isDownloading && <DownloadIcon />}
                        </LoadingButton>
                    }
                    label={t("Shared:download.label")}
                />
            )}
            {linkReference && <a ref={linkReference} />}
        </div>
    );
}
