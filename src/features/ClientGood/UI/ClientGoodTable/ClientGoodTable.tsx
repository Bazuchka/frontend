import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClientGoodInitDialog } from "src/features/ClientGood/UI/ClientGoodInit";
import { ClientGoodUploadDialog } from "src/features/ClientGood/UI/ClientGoodUpload";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { PermissionLevel } from "src/shared/types";
import { Button } from "src/shared/UI/Button";
import clientGoodStore, { IClientGood } from "../../store/ClientGoodStore";
import { getColumns } from "./configs";

interface ClientGoodTableProps {}

const ClientGoodTable: FunctionComponent<ClientGoodTableProps> = observer(() => {
    const { t } = useTranslation();
    const [uploadModalIsOpen, setUploadModalIsOpen] = useState<boolean>(false);
    const [initModalIsOpen, setInitModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <TableWithNavigation
                getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IClientGood>[]}
                store={clientGoodStore}
                navigationPaths={{
                    info: "/client-good",
                    create: "/client-good/create",
                }}
                permissionPath="ClientGood"
                isLoading={clientGoodStore.state.isLoading}
                footerSettings={{
                    hasCreateButton: false,
                    additionalButtons: (isLoading, classes) => (
                        <WithPermission
                            permission={{
                                path: "ClientGood",
                                level: PermissionLevel.CREATE,
                                type: PermissionType.FORM,
                            }}>
                            <Button
                                disabled={isLoading}
                                className={classes.button}
                                onClick={() => setInitModalIsOpen(true)}>
                                {t("Action:create")}
                            </Button>
                            <Button
                                disabled={isLoading}
                                className={classes.button}
                                onClick={() => setUploadModalIsOpen(true)}>
                                {t("Action:upload")}
                            </Button>
                        </WithPermission>
                    ),
                }}
            />
            <ClientGoodUploadDialog
                modalIsOpen={uploadModalIsOpen}
                setModalIsOpen={setUploadModalIsOpen}
                onUploadFile={clientGoodStore.uploadFile}
                onUploadComplete={clientGoodStore.fetch}
            />
            <ClientGoodInitDialog
                modalIsOpen={initModalIsOpen}
                setModalIsOpen={setInitModalIsOpen}
            />
        </>
    );
});

export default ClientGoodTable;
