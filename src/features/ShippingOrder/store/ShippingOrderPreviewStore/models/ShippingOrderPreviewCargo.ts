import { types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";

const ShippingOrderPreviewCargo = types.model("ShippingOrderPreviewCargo", {
    id: types.string,
    batch: types.maybeNull(ForeignKey),
    clientGood: types.maybeNull(
        types.model({
            batchAccountingType: types.string,
            id: types.identifier,
            code: types.string,
            name: types.maybeNull(types.string),
            unitOfMeasure: ForeignKey,
            tempRegime: types.maybeNull(ForeignKey),
            dangerClass: ForeignKey,
            price: types.maybeNull(types.number),
            item: types.maybeNull(types.string),
            isVariable: types.maybeNull(types.boolean),
        })
    ),
    totalQuantity: types.number,
});

export default ShippingOrderPreviewCargo;
