interface SessionTimeoutConfiguration {
    time: number;
}

export const sessionTimeoutConfiguration: SessionTimeoutConfiguration = {
    time: 1000 * 60 * (parseInt(window._env_?.ALIS_FRONTEND__USER_SESSION_TIMEOU, 10) || 10),
};
