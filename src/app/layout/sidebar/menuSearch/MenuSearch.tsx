import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { TextField, useTheme, MenuItem, Typography, Paper, Popper, MenuList } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { filterList, getFlatList } from "./src/libs";
import { SearchProps } from "./types/types";
import { useMenuSearchStyles } from "./styles/styles";

const SEARCH_RESULTS_LIMIT = 10;

const MenuSearch: FC<SearchProps> = ({ menu, isSidebarOpen }): JSX.Element => {
    const theme = useTheme();
    const classes = useMenuSearchStyles({ theme });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [value, setValue] = useState("");
    const [showPopper, setShowPopper] = useState(true);

    const input = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const menuItems = getFlatList(menu);

    const filteredList = filterList(menuItems, value).slice(0, SEARCH_RESULTS_LIMIT);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
        setShowPopper(true);
    };

    useEffect(() => {
        if (input.current) {
            setAnchorEl(input.current);
        }
    }, []);

    const handleItemClick = (path: string) => {
        navigate(path);
        setValue("");
        setShowPopper(false);
    };

    const handleCloseButtonClick = () => {
        setValue("");
    };

    if (!isSidebarOpen) {
        return <div className={classes.wrapperHidden}></div>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <TextField
                    onChange={handleInputChange}
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={value}
                    className={classes.input}
                    ref={input}
                    autoComplete="false"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {value && (
                    <button className={classes.inputCloseButton} onClick={handleCloseButtonClick}>
                        <CloseIcon color="secondary" />
                    </button>
                )}
            </div>
            {showPopper && (
                <Popper
                    className={classes.container}
                    open={!!filteredList.length}
                    anchorEl={anchorEl}>
                    <Paper className={classes.paper}>
                        <MenuList>
                            {filteredList.map(({ label, path, breadcrumbs }) => {
                                return (
                                    <MenuItem
                                        onClick={() => handleItemClick(path as string)}
                                        key={path}>
                                        <Typography variant="inherit">
                                            <span className={classes.itemLabel}>{label}</span>
                                            <span className={classes.breadcrumbs}>
                                                {breadcrumbs.map((item, i) => (
                                                    <>
                                                        <span key={i}>{item}</span>
                                                        {i < breadcrumbs.length - 1 && (
                                                            <KeyboardArrowRightIcon />
                                                        )}
                                                    </>
                                                ))}
                                            </span>
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Paper>
                </Popper>
            )}
        </div>
    );
};

export default MenuSearch;
