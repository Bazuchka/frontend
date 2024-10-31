import { SortingDirection } from "src/shared/request/types";
import { ContainersStore, type IContainerItem } from "./ContainersStore";

const containersStore = ContainersStore.create({
    sorting: {
        defaultSorting: {
            sortingColumn: "number",
            sortingDirection: SortingDirection.DESC,
        },
    },
});

export { containersStore, IContainerItem };
