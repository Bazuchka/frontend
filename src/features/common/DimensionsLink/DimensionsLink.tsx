import { Link } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
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
}

const DimensionsLink: FunctionComponent<DimensionsLinkProps> = ({
    onChange,
    defaultValue,
    permissionPath,
}) => {
    const [isDrawerOPen, setIsDrawerOpen] = useState(false);
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
    return (
        <>
            {onChange ? (
                <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsDrawerOpen(true)}
                    whiteSpace={"normal"}>
                    {text}
                </Link>
            ) : (
                <>{text}</>
            )}
            <IDrawer open={isDrawerOPen} onCloseIconClick={handleCloseIconClick}>
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
