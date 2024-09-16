import { Link } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalEventsHandle } from "src/shared/hooks/useDrawerForm";
import { IDrawer } from "src/shared/UI/IDrawer";
import { DimensionsForm } from "./DimensionsForm";

export interface IDimensions {
    length: number;
    width: number;
    height: number;
    volume: number;
    weight: number;
}

interface DimensionsLinkProps {
    onChange?: (dimensions: IDimensions) => void;
    defaultValue: IDimensions;
    permissionPath: string;
    invalid?: boolean;
    externalValue?: IDimensions | null;
}

const DimensionsLink: FunctionComponent<DimensionsLinkProps> = ({
    onChange,
    defaultValue,
    permissionPath,
    externalValue = {
        length: 0,
        width: 0,
        height: 0,
        volume: 0,
        weight: 0,
    },
    invalid = false,
}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [value, setValue] = useState<IDimensions>(defaultValue);
    const dimensionsFormRef = useRef<ExternalEventsHandle>(null);
    const [t] = useTranslation();

    const handleClose = (submited?: boolean, data?: unknown) => {
        setIsDrawerOpen(false);
        if (submited) {
            onChange?.(data! as IDimensions);
            setValue(data! as IDimensions);
        }
    };

    const handleCloseIconClick = () => {
        dimensionsFormRef.current?.onClose();
    };

    const text = `${value.width} x ${value.height} x ${value.length} (${t("Dimensions:measurement.length")}), ${value.weight}
        ${t("Dimensions:measurement.wight")}, ${value.volume} 
        ${t("Dimensions:measurement.volume")}`;

    useEffect(() => {
        if (
            externalValue?.height === value.height &&
            externalValue?.width === value.width &&
            externalValue?.length === value.length &&
            externalValue?.volume === value.volume
        ) {
            return;
        }

        const newValue = {
            length: externalValue?.length ?? 0,
            width: externalValue?.width ?? 0,
            height: externalValue?.height ?? 0,
            volume: externalValue?.volume ?? 0,
            weight: externalValue?.weight ?? 0,
        };

        setValue(newValue);
        onChange?.(newValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [externalValue]);

    return (
        <>
            {onChange ? (
                <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsDrawerOpen(true)}
                    whiteSpace={"normal"}
                    sx={{ color: invalid ? "error.main" : undefined }}>
                    {text}
                </Link>
            ) : (
                <>{text}</>
            )}
            <IDrawer open={isDrawerOpen} onCloseIconClick={handleCloseIconClick}>
                <DimensionsForm
                    defaultValue={value}
                    onClose={handleClose}
                    ref={dimensionsFormRef}
                    permissionPath={permissionPath}
                />
            </IDrawer>
        </>
    );
};

export default DimensionsLink;
