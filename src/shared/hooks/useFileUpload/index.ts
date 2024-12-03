import { ChangeEvent, useRef, DragEvent, useState, useCallback } from "react";

type UseFileUploadProps = {
    cb: (data: { file: File; name: string }) => void;
};

export const useFileUpload = ({ cb }: UseFileUploadProps) => {
    const input = useRef<HTMLInputElement>(null);
    const [isDropZoneActive, setIsDropZoneActive] = useState(false);

    const handleUploadFile = useCallback(
        (file: File) => {
            cb({ file, name: file.name });
        },
        [cb]
    );

    const handleFileInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files) {
                return;
            }

            const { files } = event.target;
            handleUploadFile(files[0]);
        },
        [handleUploadFile]
    );

    const handleFileDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDropZoneActive(true);
    }, []);

    const handleFileDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDropZoneActive(false);
    }, []);

    const handleFileDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDropZoneActive(false);

            if (!event.dataTransfer) {
                return;
            }

            const { files } = event.dataTransfer;
            handleUploadFile(files[0]);
        },
        [handleUploadFile]
    );

    const handleAddFileButtonClick = useCallback(() => {
        input.current?.click();
    }, []);

    return {
        input,
        handleFileInputChange,
        isDropZoneActive,
        handleFileDragOver,
        handleFileDragLeave,
        handleFileDrop,
        handleAddFileButtonClick,
    };
};
