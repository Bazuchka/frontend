import { Chip, ChipProps } from "@mui/material";
import { FunctionComponent } from "react";

interface AlisChip extends ChipProps {}

const AlisChip: FunctionComponent<AlisChip> = (props) => {
    return <Chip {...props} style={{ background: "#FFD7D5", borderRadius: 0, ...props.style }} />;
};

export default AlisChip;
