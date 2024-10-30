import { types } from "mobx-state-tree";
import { RemainsContainerItem } from "./RemainsContainerItem";

// todo нужно наполнить модель для стора
export const RemainsContainers = types.model("RemainsContainers", {
    id: types.identifier,
    remainsContainer: RemainsContainerItem,
});
