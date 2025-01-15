import { PreloaderBold, PreloaderRegular, PreloaderSemibold } from "src/assets/icons";
import { usePreloaderStyles } from "./styles";

interface IPropsPreloader {
    size: preloaderSize;
}

export enum preloaderSize {
    regular,
    semibold,
    bold,
}
export default function Preloader({ size }: IPropsPreloader) {
    const styles = usePreloaderStyles(size)();

    const getPreloader = (size: preloaderSize) => {
        switch (size) {
            case preloaderSize.semibold:
                return <PreloaderSemibold />;
            case preloaderSize.bold:
                return <PreloaderBold />;

            default:
                return <PreloaderRegular />;
        }
    };

    return <div className={styles.preloader}>{getPreloader(size)}</div>;
}
