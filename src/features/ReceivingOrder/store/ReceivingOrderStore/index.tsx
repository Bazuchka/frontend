import { reaction } from "mobx";
import { SortingDirection } from "src/shared/request/types";
import ReceivingOrderStore from "./ReceivingOrderStore";

const receivingOrderStore = ReceivingOrderStore.create({
    sorting: {
        defaultSorting: {
            sortingColumn: "number",
            sortingDirection: SortingDirection.DESC,
        },
    },
});

export default receivingOrderStore;

reaction(
    () => {
        return receivingOrderStore.current;
    },
    (value) => {
        if (value) {
            value.getTransport();
            value.getReceivingOrderGoods();
            value.getReceivingOrderCargo();
        }
    }
);
