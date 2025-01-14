import { createTheme } from "@mui/material";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "src/index.css";

declare module "@mui/material/styles" {
    interface Theme {
        mainBackgroundColor?: string;
        headerBackgroundColor?: string;
        headerTextColor?: string;
        linkColor?: string;
        iconSize?: string;
        tableTopHeight?: string;
        tableBottomHeight?: string;
        surfaceColor?: string;
        colors: {
            primary: Record<number | string, string>;
            secondary: Record<number | string, string>;
            gray: Record<number | string, string>;

            error?: string;
            success?: string;
            accent?: Record<string, string>;
            black?: string;
            charcoal?: string;
            iron?: string;
            fossil?: string;
            label?: Record<string, string>;
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
        surfaceColor?: string;
        headerBackgroundColor?: string;
        headerTextColor?: string;
        linkColor?: string;
        iconSize?: string;
        colors: {
            primary: Record<number | string, string>;
            secondary: Record<number | string, string>;
            gray: Record<number | string, string>;

            error?: string;
            success?: string;
            accent?: Record<string, string>;
            black?: string;
            charcoal?: string;
            iron?: string;
            fossil?: string;
            label?: Record<string, string>;
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

export enum ThemeList {
    default = "theme",
    light = "light",
    dark = "dark",
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

export const lightTheme = createTheme({
    ...theme,
    mainBackgroundColor: "#F9FAFC",
    surfaceColor: "#FFFFFF",
    colors: {
        ...theme.colors,
        primary: {
            ...theme.colors.primary,
            main: "#3472ED",
            variant: "#397CFF",
        },
        secondary: {
            ...theme.colors.secondary,
            main: "#5D8FF2",
            variant: "#EEF4FF",
            light: "#83acff",
        },
        error: "#E8493D",
        success: "#16C17C",
        accent: {
            main: "#FF9027",
            variant: "#6FDCE3",
        },
        black: "#000",
        charcoal: "#4B4B51",
        iron: "#76757A",
        fossil: "#A6A5A8",
        gray: {
            disabled: "#F9F9F9",
            superLightGray: "#F2F4F7",
            greyishBlue: "#F2F7FF",
            lightGrey: "#D8DDE3",
        },
        label: {
            purple_1: "#F9F5FF",
            purple_2: "#9E77ED",
            purple_3: "#6941C6",
            red_1: "#FEF3F2",
            red_2: "#F04438",
            red_3: "#B42318",
            yellow_1: "#FFFAEB",
            yellow_2: "#F79009",
            yellow_3: "#B54708",
            green_1: "#ECFDF3",
            green_2: "#12B76A",
            green_3: "#027A48",
            blue_1: "#EFF8FF",
            blue_2: "#2E90FA",
            blue_3: "#175CD3",
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
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
});

/**
 * Данные цвета не согласованы и используются в рамках эксперимента с темизацией
 * были сконфигурированы на ресурсе https://mdigi.tools/darken-color
 * Amount to Darken = 60%
 */
export const darkTheme = createTheme({
    ...theme,
    colors: {
        ...theme.colors,
        primary: {
            ...theme.colors.primary,
            800: "#070717",
            500: "#14162c",
            450: "#1f2133",
            400: "#2a2c3b",
            200: "#36394c",
            100: "#41455e",
            50: "#4d556d",
            white: "#666666",
            border: "#5a5a5a",
            menuItemHover: "#242637",
        },
        secondary: {
            ...theme.colors.secondary,
            900: "#060409",
            800: "#343235",
            500: "#4c494d",
            300: "#554c60",
            200: "#5d5071",
        },
        gray: {
            300: "#554c60",
        },
    },
});
