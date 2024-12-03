import { reaction } from "mobx";
import { SortingDirection } from "src/shared/request/types";
import ShippingOrderStore from "./ShippingOrderStore";

const shippingOrderStore = ShippingOrderStore.create({
    sorting: {
        defaultSorting: {
            sortingColumn: "number",
            sortingDirection: SortingDirection.DESC,
        },
    },
});

export default shippingOrderStore;

reaction(
    () => {
        return shippingOrderStore.current;
    },
    (value) => {
        if (value) {
            value.getTransport();
            value.getShippingOrderGoods();
            value.getShippingOrderCargo();
        }
    }
);
