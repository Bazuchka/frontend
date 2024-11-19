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
    readonly ref: React.MutableRefObject<HTMLElement | null>;
    readonly name: string | undefined;
    readonly url: string | undefined;
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
    const ref = useRef<HTMLElement | null>(null);
    const [url, setFileUrl] = useState<string>();
    const [name, setFileName] = useState<string>();

    const fetchFile = async () => {
        try {
            // выполняем действия до скачивания (например установим loading-state для кнопки)
            beforeDownloadCallback?.();

            // получим данные для скачивания
            const { data } = await apiDefinition();

            // пишем данные для скачивания
            const url = URL.createObjectURL(new Blob([data], additionalBlobData));
            setFileUrl(url);
            setFileName(getFileName());

            // начинаем скачивание
            ref.current?.click();

            // выполним действия для окончания скачивания
            successEndCallback?.(url);
            URL.revokeObjectURL(url);
        } catch (error) {
            onError?.(error);
        } finally {
            onFinally?.();
        }
    };

    return { fetchFile, ref, url, name };
};
