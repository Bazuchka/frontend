import { types } from "mobx-state-tree";
import { AddAlertMessageProps, Alert } from "src/app/store/types";
import { ForeignKey } from "src/shared/entities";
import { IForeignKey } from "src/shared/entities/ForeignKey";
import { v4 as uuidv4 } from "uuid";
import { MenuParams } from "../layout/sidebar/menu/config/menuConfiguration";

export interface IGlobalFilters {
    client?: IForeignKey;
    legalEntity?: IForeignKey;
}

const GlobalFilters = types
    .model("GlobalFilters", {
        client: types.maybe(ForeignKey),
        legalEntity: types.maybe(ForeignKey),
    })
    .actions((self) => ({
        setClient(value?: IForeignKey): void {
            self.client = value;
        },
        setLegalEntity(value?: IForeignKey): void {
            self.legalEntity = value;
        },
    }))
    .postProcessSnapshot((self) => {
        const params: IGlobalFilters = {};
        if (self.client) {
            params.client = self.client;
        }
        if (self.legalEntity) {
            params.legalEntity = self.legalEntity;
        }
        return params;
    });

/**
 * ViewStore is a MobX state tree model that holds app-wide state
 *
 * @name ViewStore
 * @class
 * @property {string} pageTitle - The title of the page
 * @property {Array<Alert>} alerts - An array of alerts to be displayed
 * @property {boolean} isMenuOpen - Whether the menu is open or not
 * @property {(title: string) => void} setPageTitle - A function to set the page title
 * @property {(alert: AddAlertMessageProps) => void} addAlert - A function to add an alert
 * @property {(id: string) => void} deleteAlert - A function to delete an alert
 * @property {() => void} toggleMenu - A function to toggle the menu
 */
export const ViewStore = types
    .model({
        pageTitle: "",
        alerts: types.array(types.frozen<Alert>()),
        isMenuOpen: true,
        menuParams: types.maybe(types.frozen<MenuParams>()),
        globalFilters: types.optional(GlobalFilters, {}),
    })
    .actions((self) => ({
        /**
         * Set the page title
         *
         * @name setPageTitle
         * @function
         * @param {string} title - The new title of the page
         * @returns {void}
         */
        setPageTitle(title: string): void {
            self.pageTitle = title;
        },
        /**
         * Add an alert
         *
         * @name addAlert
         * @function
         * @param {AddAlertMessagePropsI} alert - The alert to add
         * @returns {void}
         */
        addAlert(alert: AddAlertMessageProps): void {
            if (alert.throttleByMessage) {
                if (
                    self.alerts.some(
                        (el) => el.message === alert.message && el.alertMode === alert.alertMode
                    )
                ) {
                    return;
                }
            }
            self.alerts.push({
                alertMode: alert.alertMode || "success",
                isDelete: alert.isDelete,
                message: alert.message,
                context: alert.context,
                closeTime: alert.closeTime,
                id: uuidv4(),
            });
        },
        /**
         * Delete an alert
         *
         * @name deleteAlert
         * @function
         * @param {string} id - The id of the alert to delete
         * @returns {void}
         */
        deleteAlert(id: string): void {
            self.alerts.splice(
                self.alerts.findIndex((el) => el.id === id),
                1
            );
        },
        /**
         * Toggle the sidebar menu
         *
         * @name toggleMenu
         * @function
         * @returns {void}
         */
        toggleMenu(): void {
            self.isMenuOpen = !self.isMenuOpen;
        },

        /**
         * Sets params for menu configuration
         *
         * @param {MenuParams} params - The parameters to set for the menu.
         * @return {void}
         */
        setMenuParams(params: MenuParams): void {
            self.menuParams = { ...self.menuParams, ...params } || params;
        },
    }));
