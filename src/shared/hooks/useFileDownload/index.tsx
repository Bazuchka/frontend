import { AxiosResponse } from "axios";
import { useRef, useState } from "react";

interface DownloadFileProps {
    readonly apiDefinition: () => Promise<AxiosResponse<Blob>>;
    readonly getFileName: () => string;
    readonly additionalBlobData?: Record<string, string>;
    readonly beforeDownloadCallback?: () => void;
    readonly successEndCallback?: (url: string) => void;
    readonly onError?: (e: unknown) => void;
    readonly onFinally?: () => void;
}

interface DownloadedFileInfo {
    readonly fetchFile: () => Promise<void>;
    readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
    readonly isDownloading: boolean;
    readonly isErrorDownload: boolean;
}

export const useFileDownload = ({
    apiDefinition,
    getFileName,
    additionalBlobData,
    beforeDownloadCallback,
    successEndCallback,
    onError,
    onFinally,
}: DownloadFileProps): DownloadedFileInfo => {
    const ref = useRef<HTMLAnchorElement | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isErrorDownload, setErrorDownload] = useState(false);

    const fetchFile = async () => {
        try {
            setErrorDownload(false);

            // выполняем действия до скачивания (например установим loading-state для кнопки)
            beforeDownloadCallback?.();
            setIsDownloading(true);

            // получим данные для скачивания
            const { data } = await apiDefinition();

            // пишем данные для скачивания
            const blob = new Blob([data], additionalBlobData);
            const url = URL.createObjectURL(blob);

            if (ref?.current) {
                ref.current!.href = url;
                ref.current!.download = getFileName();

                // начинаем скачивание
                ref.current?.click();
            }

            // выполним действия для окончания скачивания
            successEndCallback?.(url);
            URL.revokeObjectURL(url);
        } catch (error) {
            onError?.(error);
            setErrorDownload(true);

            throw new Error(error as string);
        } finally {
            onFinally?.();
            setIsDownloading(false);
        }
    };

    return { fetchFile, ref, isDownloading, isErrorDownload };
};
