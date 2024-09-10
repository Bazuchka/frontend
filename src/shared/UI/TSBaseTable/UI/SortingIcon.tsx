import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { SortingDirection } from "src/shared/request/types";
import { ITSSorting } from "../store/TSSorting";
import useStyles from "./styles";

type SortingIconProps = {
    columnId: string;
    tsSorting: ITSSorting;
};

const iconMapping: Record<SortingDirection, JSX.Element> = {
    [SortingDirection.ASC]: <ArrowUpwardIcon />,
    [SortingDirection.DESC]: <ArrowDownwardIcon />,
    [SortingDirection.NONE]: <div></div>,
};

export const SortingIcon = observer((props: SortingIconProps) => {
    const { columnId, tsSorting } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });

    const sortingDirection = tsSorting.sorting.sortingDirection ?? SortingDirection.NONE;
    const icon = iconMapping[sortingDirection];

    const isSortingActive = tsSorting.sorting.sortingColumn === columnId;

    const handleButtonClick = () => {
        tsSorting.setNextSorting(columnId);
    };

    return (
        <button onClick={handleButtonClick} className={classes.sortButton}>
            {isSortingActive && <div className={classes.sortIcon}>{icon}</div>}
        </button>
    );
});
