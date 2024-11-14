import { containerMovement } from "../store";
import ContainerMovementTable from "./ContainerMovementTable";

const ContainersMovement = () => {
    return <ContainerMovementTable store={containerMovement} />;
};

export { ContainersMovement };
