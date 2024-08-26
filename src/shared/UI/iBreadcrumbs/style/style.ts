import { createUseStyles } from "react-jss";

export const useIBreadcrumbsStyles = createUseStyles({
    root: {
        color: "white",
    },
    link: {
        color: "white",
        textDecoration: "none",
    },
    activeLink: {
        color: "white",
        textDecoration: "underline",
    },
});
