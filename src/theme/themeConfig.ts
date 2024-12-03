import { createTheme } from "@mui/material";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

declare module "@mui/material/styles" {
    interface Theme {
        mainBackgroundColor?: string;
        headerBackgroundColor?: string;
        headerTextColor?: string;
        linkColor?: string;
        iconSize?: string;
        tableTopHeight?: string;
        tableBottomHeight?: string;
        colors: {
            primary: Record<number | string, string>;
            secondary: Record<number | string, string>;
            gray: Record<number | string, string>;
        };
        error: {
            backgroundColor: string;
            borderColor: string;
            color: string;
        };
        contentWrapper: {
            padding: number;
            backgroundColor: string;
            borderRadius: number;
            border: string;
        };
    }

    interface ThemeOptions {
        mainBackgroundColor?: string;
        headerBackgroundColor?: string;
        headerTextColor?: string;
        linkColor?: string;
        iconSize?: string;
        colors: {
            primary: Record<number | string, string>;
            secondary: Record<number | string, string>;
            gray: Record<number | string, string>;
        };
        error: {
            backgroundColor: string;
            borderColor: string;
            color: string;
        };
        contentWrapper: {
            padding: number;
            backgroundColor: string;
            borderRadius: number;
            border: string;
        };
    }
}

export const theme = createTheme({
    colors: {
        primary: {
            800: "#121239",
            500: "#32386D",
            450: "#4D5380",
            400: "#6A6F94",
            200: "#9297B2",
            100: "#BCBFD1",
            50: "#E4E6EC",
            black: "#000",
            white: "#FFFFFF",
            border: "#e0e0e0",
            menuItemHover: "#5b5f8a",
        },
        secondary: {
            900: "#0E0916",
            800: "#817E84",
            500: "#BCB9BD",
            300: "#D7D3DC",
            200: "#F0EEF3",
        },
        gray: {
            300: "#D7D3DC",
        },
    },
    palette: {
        primary: {
            main: "#32386D",
        },
        secondary: {
            main: "#0E0916",
        },
        success: {
            main: "#4CAF50",
        },
        error: {
            main: "#EF5350",
        },
        warning: {
            main: "#FF9800",
        },
        info: {
            main: "#03A9F4",
        },
        text: {
            disabled: "#D7D3DC",
            secondary: "#6A6F94",
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
        fontSize: 14,
        body1: {
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "150%",
            letterSpacing: "0.15px",
        },
        body2: {
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "143%",
            letterSpacing: "0.17px",
        },
        subtitle1: {
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "0.15px",
        },
        subtitle2: {
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "157%",
            letterSpacing: "0.1px",
        },
        overline: {
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "266%",
            letterSpacing: "0.15px",
            textTransform: "uppercase",
        },
        caption: {
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "166%",
            letterSpacing: "0.4px",
        },
        h6: {
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "166%",
            letterSpacing: "0.15px",
        },
        h5: {
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "133%",
        },
        h4: {
            fontSize: "34px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "123%",
            letterSpacing: "0.25px",
        },
        h3: {
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "116%",
        },
        h2: {
            fontSize: "60px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "120%",
            letterSpacing: "-0.5px",
        },
        h1: {
            fontSize: "91px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "116%",
            letterSpacing: "-1.5px",
        },
    },
    mainBackgroundColor: "#f5f5f5",
    headerBackgroundColor: "#121239",
    headerTextColor: "#FFFFFF",
    linkColor: "#0000FF",
    error: {
        backgroundColor: `rgb(126, 10, 15, 0.1)`,
        borderColor: `rgb(126, 10, 15, 1)`,
        color: "#750f0f",
    },
    contentWrapper: {
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        border: "1px solid #e0e0e0",
    },
    iconSize: "24px",
});
