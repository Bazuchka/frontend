import { FC } from "react";
import { createPortal } from "react-dom";
import { DownloadButton, IDownloadButton } from "src/shared/UI/DownloadButton";

interface IPageDownloadButton extends IDownloadButton {}

const PageDownloadButton: FC<IPageDownloadButton> = (props: IPageDownloadButton) => {
    const containerRef = document.getElementById("pageTitleWrapper");

    if (!containerRef) {
        return;
    }

    return createPortal(<DownloadButton {...props} />, containerRef);
};

export default PageDownloadButton;
