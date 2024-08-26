import { t } from "i18next";
import { ReactNode } from "react";
import { ConfigurationFile, Dictionary, OrdersIcon } from "src/assets/svg";
import { Permission } from "src/shared/services/PermissionService/types";

export interface MenuItem {
    breadCrumbsLabel?: string;
    label: string;
    icon?: ReactNode | string;
    key: string;
    path?: string;
    permission?: Permission;
    children?: MenuItem[];
    isInvisibleMenuItem?: boolean;
}

export type MenuConfiguration = MenuItem[];
export type MenuParams = Record<
    string,
    { label: string; path: string; metadata: Record<string, unknown> } | undefined
>;

export const menuConfiguration = (params?: MenuParams): MenuConfiguration => [
    {
        label: t("Shared:Reference.dictionary"),
        icon: <Dictionary />,
        key: "dictionary",
        children: [
            {
                label: t("Client:menu.clients"),
                key: "clients",
                path: "/clients",
                permission: {
                    path: "Client",
                },
                children: [
                    {
                        breadCrumbsLabel: t("Client:menu.client"),
                        label: `${params?.client?.label ?? ""} (${t("Client:menu.client")})`,
                        key: "client",
                        path: `/client/${params?.client?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "Client",
                        },
                    },
                ],
            },

            {
                label: t("LegalEntity:menu.all"),
                key: "legal-entities",
                path: "/legal-entities",
                permission: {
                    path: "LegalEntity",
                },
                children: [
                    {
                        breadCrumbsLabel: t("LegalEntity:menu.legalEntity"),
                        label: `${params?.legalEntity?.label ?? ""} (${t("LegalEntity:menu.legalEntity")})`,
                        key: "legal-entity",
                        path: `/legal-entity/${params?.legalEntity?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "LegalEntity",
                        },
                    },
                ],
            },
            {
                label: t("ClientGood:menu.all"),
                key: "client-goods",
                path: "/client-goods",
                permission: {
                    path: "ClientGood",
                },
                children: [
                    {
                        breadCrumbsLabel: t("ClientGood:menu.clientGood"),
                        label: `${t("Shared:menu.new.masculine")}* (${t("ClientGood:menu.clientGood")})`,
                        key: "client-good-create",
                        path: "/client-good/create",
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "ClientGood",
                        },
                    },
                    {
                        breadCrumbsLabel: t("ClientGood:menu.clientGood"),
                        label: `${params?.clientGood?.label} (${t("ClientGood:menu.clientGood")})`,
                        key: "client-good-create",
                        path: `/client-good/${params?.clientGood?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "ClientGood",
                        },
                    },
                ],
            },

            {
                label: t("LegalEntity:menu.client"),
                key: "client-related-entities",
                path: "/client-related-entities",
                permission: {
                    path: "ClientRelatedEntity",
                },
            },
            {
                label: t("Service:menu.all"),
                key: "services",
                path: "/services",
                permission: {
                    path: "Service",
                },
                children: [
                    {
                        breadCrumbsLabel: t("Service:menu.service"),
                        label: `${params?.service?.label ?? ""} (${t("Service:menu.service")})`,
                        key: "service",
                        path: `/service/${params?.service?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "Service",
                        },
                    },
                ],
            },
            {
                label: t("ClientGoodType:menu.all"),
                key: "client-good-types",
                path: "/client-good-types",
                permission: {
                    path: "ClientGoodType",
                },
            },
            {
                label: t("TermOfService:menu.all"),
                key: "term-of-services",
                path: "/term-of-services",
                permission: {
                    path: "TermOfService",
                },
                children: [
                    {
                        breadCrumbsLabel: t("TermOfService:menu.short"),
                        label: `${t("Shared:menu.new.masculine")}* (${t("TermOfService:menu.short")})`,
                        key: "term-of-service-create",
                        path: "/term-of-service/create",
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "TermOfService",
                        },
                    },
                    {
                        breadCrumbsLabel: t("TermOfService:menu.short"),
                        label: `${params?.termOfService?.label} (${t("TermOfService:menu.short")})`,
                        key: "term-of-service-edit",
                        path: `/term-of-service/${params?.termOfService?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "TermOfService",
                        },
                    },
                ],
            },
            {
                label: t("ClientVehicle:menu"),
                key: "client-vehicles",
                path: "/client-vehicles",
                permission: {
                    path: "ClientVehicle",
                },
            },
            {
                label: t("ClientDriver:menu"),
                key: "client-drivers",
                path: "/client-drivers",
                permission: {
                    path: "ClientDriver",
                },
            },
        ],
    },
    {
        label: t("Shared:Reference.configuration"),
        icon: <ConfigurationFile />,
        key: "configuration",
        children: [
            {
                label: t("UnitOfMeasure:menu"),
                key: "units-of-measure",
                path: "/units-of-measure",
                permission: {
                    path: "UnitOfMeasure",
                },
            },
        ],
    },
    {
        label: t("Shared:Reference.orders"),
        icon: <OrdersIcon />,
        key: "orders",
        children: [
            {
                label: t("ReceivingOrder:menu.orders"),
                key: "receiving-orders",
                path: "/receiving-orders",
                permission: {
                    path: "ReceivingOrder",
                },
                children: [
                    {
                        breadCrumbsLabel: t("ReceivingOrder:menu.order"),
                        label: `${t("ReceivingOrder:menu.order")} ${t("Shared:menu.new.feminine")}* (${t("OrderStatus:types." + (params?.receivingOrder?.metadata?.orderStatus ?? "DRAFT"))})`,
                        key: "receiving-order-create",
                        path: "/receiving-order/create",
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "ReceivingOrder",
                        },
                    },
                    {
                        breadCrumbsLabel: t("ReceivingOrder:menu.order"),
                        label: `${t("ReceivingOrder:menu.order")} №${params?.receivingOrder?.metadata?.number} (${t("OrderStatus:types." + (params?.receivingOrder?.metadata?.orderStatus ?? "DRAFT"))})`,
                        key: "receiving-order-create",
                        path: `/receiving-order/${params?.receivingOrder?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "ReceivingOrder",
                        },
                    },
                ],
            },
            {
                label: t("ShippingOrder:menu.orders"),
                key: "shipping-orders",
                path: "/shipping-orders",
                permission: {
                    path: "ShippingOrder",
                },
                children: [
                    {
                        breadCrumbsLabel: t("ShippingOrder:menu.order"),
                        label: `${t("ShippingOrder:menu.order")} ${t("Shared:menu.new.feminine")}* (${t("OrderStatus:types." + (params?.shippingOrder?.metadata?.orderStatus ?? "DRAFT"))})`,
                        key: "shipping-order-create",
                        path: "/shipping-order/create",
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "ShippingOrder",
                        },
                    },
                    {
                        breadCrumbsLabel: t("ShippingOrder:menu.order"),
                        label: `${t("ShippingOrder:menu.order")} №${params?.shippingOrder?.metadata?.number} (${t("OrderStatus:types." + (params?.shippingOrder?.metadata?.orderStatus ?? "DRAFT"))})`,
                        key: "shipping-order-create",
                        path: `/shipping-order/${params?.shippingOrder?.path}`,
                        isInvisibleMenuItem: true,
                        permission: {
                            path: "ShippingOrder",
                        },
                    },
                ],
            },
        ],
    },
];
