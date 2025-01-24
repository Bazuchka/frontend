import { types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";

const ReceivingOrderPreviewContainer = types.model("ReceivingOrderPreviewContainer", {
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
    etsngCode: types.maybeNull(ForeignKey),
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

export default ReceivingOrderPreviewContainer;
