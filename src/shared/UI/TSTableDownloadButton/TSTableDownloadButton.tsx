import { DownloadIcon } from "src/assets/svg";
import { Button } from "../Button";
import { useStyles } from "./styles";
import { ITooltype } from "../iTooltype";
import { t } from "i18next";

interface ITSTableDownloadButton {
    id: string;
    canShowButton: boolean;
    fetchFileCallback: () => Promise<void>;
    customClasses: string | null;
    linkReference: React.MutableRefObject<HTMLAnchorElement | null>;
}

export default function TSTableDownloadButton({
    id,
    canShowButton,
    fetchFileCallback,
    customClasses,
    linkReference,
}: ITSTableDownloadButton) {
    const classes = useStyles();
    const classList = customClasses ? classes.button + " " + customClasses : classes.button;

    return (
        <>
            {canShowButton && (
                <Button onClick={fetchFileCallback} className={classList}>
                    <ITooltype id={id} item={<DownloadIcon />} label={t("Shared:download.label")} />
                </Button>
            )}
            <a ref={linkReference} />
        </>
    );
}
