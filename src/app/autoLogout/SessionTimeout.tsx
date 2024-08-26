import { FC, useEffect } from "react";
import { authService } from "../../shared/services/AuthService";
import { userEvents } from "./consts/userEvents";
import { sessionTimeoutConfiguration } from "./configs/default.conf";

interface SessionTimeoutProps {
    children: React.ReactNode;
}

const SessionTimeout: FC<SessionTimeoutProps> = ({ children }: SessionTimeoutProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let timer: NodeJS.Timeout;

    useEffect(() => {
        Object.values(userEvents).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer();
                handleLogoutTimer();
            });
        });
        handleLogoutTimer();
        return () => {
            resetTimer();
            handleUnsubscribeOnEvents();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLogoutTimer = () => {
        timer = setTimeout(() => {
            // clears any pending timer.
            resetTimer();
            // Listener clean up. Removes the existing event listener from the window
            handleUnsubscribeOnEvents();
            // logs out user
            logoutAction();
        }, sessionTimeoutConfiguration.time);
    };
    const handleUnsubscribeOnEvents = () => {
        Object.values(userEvents).forEach((item) => {
            window.removeEventListener(item, resetTimer);
        });
    };
    const resetTimer = () => {
        if (timer) {
            clearTimeout(timer);
        }
    };
    const logoutAction = () => {
        localStorage.clear();
        authService.doLogout();
    };

    return <>{children}</>;
};

export default SessionTimeout;
