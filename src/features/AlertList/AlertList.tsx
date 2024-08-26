import { observer } from "mobx-react";
import { createUseStyles } from "react-jss";
import { viewStore } from "src/app/store";
import { IAlert } from "src/shared/UI/iAlert";

const useStyles = createUseStyles({
    wrapper: {
        maxWidth: "50%",
        position: "absolute",
        top: "50px",
        right: "25%",
        width: "50%",
        zIndex: 5000,
    },
});

const AlertList = observer(() => {
    const { alerts } = viewStore;
    const classes = useStyles();

    return (
        <ul className={classes.wrapper}>
            {alerts.map((alert) => {
                const { alertMode, context, message, isDelete, id, closeTime } = alert;

                return (
                    <li key={alert.id}>
                        <IAlert
                            mode={alertMode}
                            isDelete={isDelete}
                            message={message}
                            context={context}
                            id={id}
                            closeTime={closeTime}
                        />
                    </li>
                );
            })}
        </ul>
    );
});

export default AlertList;
