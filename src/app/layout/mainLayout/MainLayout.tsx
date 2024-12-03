import { FC } from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { observer } from "mobx-react";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { Content } from "../content";
import { Footer } from "../footer";
import { viewStore } from "src/app/store";

const MainLayout: FC = observer(() => {
    const { isMenuOpen, toggleMenu } = viewStore;

    return (
        <>
            <CssBaseline />
            <Header />
            <Sidebar isMenuOpen={isMenuOpen} onClick={() => toggleMenu()} />
            <Content isMenuOpen={isMenuOpen}>
                <Outlet />
            </Content>
            <Footer isMenuOpen={isMenuOpen} />
        </>
    );
});

export default MainLayout;
