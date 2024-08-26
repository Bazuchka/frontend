import { reaction } from "mobx";
import ShippingOrderStore from "./ShippingOrderStore";

const shippingOrderStore = ShippingOrderStore.create();

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
