import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme: Theme) => ({
    tableContainer: {
        height: "calc(100% - 50px)",
        backgroundColor: "white",
    },
    tableHeader: {
        padding: "15",
    },
    footerWrapper: {
        overflow: "hidden",
    },
    tableCellHeader: {
        backgroundColor: theme?.colors?.primary[500],
        height: "35px",
    },
    headerInner: {
        display: "flex",
        alignItems: "stretch",
        columnGap: "10px",
    },
    sortButton: {
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer",
        flexGrow: 1,
        "&  svg": {
            fill: "white",
            width: "20px",
            height: "20px",
        },
    },
    sortIcon: { width: "20px", height: "20px" },
    wrapper: {
        position: "relative",
        border: `1px solid ${theme?.colors?.primary[50]}`,
        borderRadius: "5px",
        overflow: "hidden",
        height: "100%",
        "& .MuiTable-root": {
            tableLayout: "fixed",
            maxWidth: "100%",
            borderCollapse: "collapse",
        },
        "& .MuiTableRow-head": {
            backgroundColor: theme?.colors?.primary[500],
            "& th": {
                paddingTop: "7px",
                paddingBottom: "7px",
                height: "39px",
            },
        },
        "& .MuiTableCell-head": {
            color: "white",
            textWrap: "nowrap",
        },
        "& td.MuiTableCell-body": {
            height: "43px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingTop: "0",
            paddingBottom: "0",
        },
        "& > .MuiSvgIcon-root .MuiSvgIcon-fontSizeMedium": {
            fill: "red",
        },
        "& .MuiDataGrid-root": {},
        width: "100%",
        "& .Mui-error": {
            backgroundColor: theme?.error?.backgroundColor,
            borderColor: theme?.error?.borderColor,
            color: theme?.error?.color,
            height: "100%",
        },
        "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme?.colors?.primary[500],
            color: "white",
            "& .MuiCheckbox-root": {
                color: "white",
            },
            "& .MuiSvgIcon-root": {
                color: "white",
            },
        },
        "& .MuiDataGrid-row:hover": {
            backgroundColor: theme?.colors?.primary[50],
        },
        "& .Mui-selected": {
            backgroundColor: theme?.colors?.primary[50] + " !important",
        },
    },
    resizer: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "5px",
        background: "rgba(0, 0, 0, 0.5)",
        cursor: "col-resize",
        userSelect: "none",
        touchAction: "none",
        right: "0",
        opacity: 0,
        "&:hover": {
            opacity: 1,
        },
    },
    isResizing: {
        opacity: 1,
    },
    row: {
        "&:hover": {
            backgroundColor: theme?.colors?.primary[50],
        },
    },
    rowSelected: {
        backgroundColor: theme?.colors?.primary[50],
    },
    checkbox: {
        padding: "0",
        display: "flex",
    },
    headerCheckbox: {
        padding: "0",
        color: "white !important",
        display: "flex",
        "& > .PrivateSwitchBase-input .css-1m9pwf3": {
            zIndex: 0,
        },
    },
    tableCellCheckbox: {
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "49px",
        minHeight: "49px",
        "& > div:last-child": {
            marginLeft: "auto",
        },
        backgroundColor: "white",
    },
    buttonsWrapper: {
        display: "flex",
        columnGap: "10px",
    },
    buttonGroup: {
        paddingLeft: 16,
    },
    button: {
        backgroundColor: theme?.colors?.primary[500],
        color: theme?.headerTextColor,
        fontStyle: theme?.typography?.subtitle2,
        letterSpacing: 1.25,
        lineHeight: "16px",
        padding: "10px 14px",
        "&:hover": {
            backgroundColor: theme?.colors?.primary[500],
            color: theme?.headerTextColor,
        },
        "&:disabled": {
            background: theme?.colors?.secondary[500],
            color: theme?.headerTextColor,
        },
    },
    dotContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 4,
        top: 12,
        padding: "0 4px",
        zIndex: 3,
        "&:hover": {
            cursor: "pointer",
        },
    },
    dot: {
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        backgroundColor: theme?.colors?.primary?.white,
        marginBottom: "3px",
    },
    modalColumnManagmentContainer: {
        backgroundColor: theme?.colors?.primary?.white,
        padding: "8px 14px",
        border: `1px solid ${theme?.colors?.primary[50]}`,
        borderRadius: 8,
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        maxHeight: "360px",
    },
    menuModalContainer: {
        width: "300px",
        backgroundColor: theme?.colors?.primary?.white,
        border: `1px solid ${theme?.colors?.primary[50]}`,
        borderRadius: 8,
        padding: "8px 0",
        overflowX: "hidden",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        zIndex: 10,
    },
    menuModalItem: {
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 1.3,
        color: theme?.colors?.secondary[900],
        "&:hover": {
            textShadow: `0.2px 0.2px ${theme?.colors?.primary?.black};`,
        },
        background: "none",
        border: "none",
        padding: "0 16px",
    },
    divider: {
        margin: "5px 0",
    },
    menuCheckbox: {
        width: "22px",
        height: "22px",
        marginRight: "8px",
    },
    menuLabel: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "8px",
    },
    inputIconWrapper: {
        paddingLeft: 8,
        margin: "0 6px 0 0",
    },
    progress: {
        position: "absolute",
        width: "100%",
        zIndex: 3,
    },
}));

export default useStyles;
