import { reaction } from "mobx";
import ReceivingOrderStore from "./ReceivingOrderStore";

const receivingOrderStore = ReceivingOrderStore.create();

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
