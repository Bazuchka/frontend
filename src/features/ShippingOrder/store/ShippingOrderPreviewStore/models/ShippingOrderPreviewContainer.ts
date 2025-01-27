import { types } from "mobx-state-tree";
import { ForeignKey, ForeignKeyWithName } from "src/shared/entities";

const ShippingOrderPreviewContainer = types.model("ShippingOrderPreviewContainer", {
    container: types.maybeNull(
        types.model({
            id: types.string,
            code: types.string,
            containerType: types.string,
            weight: types.number,
            refrigerator: types.boolean,
            active: types.boolean,
            client: ForeignKey,
        })
    ),
    etranInvoice: types.maybeNull(ForeignKey),
    etsngCode: types.maybeNull(ForeignKeyWithName),
    grossWeight: types.number,
    id: types.string,
    netWeight: types.number,
    railwayCarriage: types.maybeNull(
        types.model({
            code: types.maybeNull(types.string),
            id: types.string,
        })
    ),
});

export default ShippingOrderPreviewContainer;
