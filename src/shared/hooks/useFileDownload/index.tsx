import { AxiosResponse } from "axios";
import { useRef } from "react";

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
    readonly fileName: string | null;
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
    const fileName = getFileName();

    const fetchFile = async () => {
        try {
            // выполняем действия до скачивания (например установим loading-state для кнопки)
            beforeDownloadCallback?.();

            // получим данные для скачивания
            const { data } = await apiDefinition();

            // пишем данные для скачивания
            const blob = new Blob([data], additionalBlobData);
            const url = URL.createObjectURL(blob);

            if (ref?.current) {
                ref.current!.href = url;
                ref.current!.download = fileName;

                // начинаем скачивание
                ref.current?.click();
            }

            // выполним действия для окончания скачивания
            successEndCallback?.(url);
            URL.revokeObjectURL(url);
        } catch (error) {
            onError?.(error);
        } finally {
            onFinally?.();
        }
    };

    return { fetchFile, ref, fileName };
};
