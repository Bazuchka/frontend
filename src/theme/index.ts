import themeStore from "./store/themeStore";
import { theme, lightTheme, darkTheme, ThemeList } from "./themeConfig";

const getTheme = (themeName: ThemeList | null) => {
    switch (themeName) {
        case ThemeList.light:
            return lightTheme;
        case ThemeList.dark:
            return darkTheme;
        default:
            return theme;
    }
};

export { getTheme, ThemeList, themeStore };
