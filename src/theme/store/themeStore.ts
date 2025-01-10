import { types } from "mobx-state-tree";

const ThemeStore = types
    .model("ThemeStore", {
        theme: types.maybeNull(types.string),
    })
    .actions((self) => {
        const defaultTheme = "theme";

        const setTheme = (theme: string | null) => {
            const newTheme = theme || defaultTheme;

            self.theme = newTheme;
        };

        return {
            setTheme,
        };
    });

const themeStore = ThemeStore.create();

export default themeStore;
