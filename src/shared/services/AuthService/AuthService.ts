import Keycloak, { KeycloakPromise } from "keycloak-js";
import { KeycloakConfig } from "../../configs/keycloak.conf";

class AuthService {
    keycloak: Keycloak;

    constructor() {
        this.keycloak = new Keycloak(KeycloakConfig);
    }

    /**
     * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
     *
     * @param onAuthenticatedCallback
     */
    initKeycloak(onAuthenticatedCallback: () => void): void {
        this.keycloak
            .init({
                onLoad: "check-sso",
                silentCheckSsoRedirectUri: window.location.origin + "/silentCheckSso.html",
                pkceMethod: "S256",
            })
            .then((authenticated: boolean) => {
                if (!authenticated) {
                    console.log("user is not authenticated..!");
                    this.doLogin().then(() => onAuthenticatedCallback());
                } else {
                    onAuthenticatedCallback();
                }
            })
            .catch(console.error);
    }

    doLogin(): KeycloakPromise<void, void> {
        return this.keycloak.login();
    }

    doLogout(): KeycloakPromise<void, void> {
        return this.keycloak.logout();
    }

    isLoggedIn(): boolean {
        return !!this.keycloak.token;
    }

    getToken(): string | undefined {
        return this.keycloak.token;
    }

    updateToken(
        successCallback: (value: boolean) => PromiseLike<boolean> | boolean
    ): Promise<boolean | void> {
        return this.keycloak
            .updateToken(5)
            .then(successCallback)
            .catch(() => {
                location.reload();
            });
    }

    getUsername(): string {
        return this.keycloak.tokenParsed?.preferred_username;
    }

    getUserFullName(): string {
        return `${this.keycloak.tokenParsed?.given_name} ${
            this.keycloak.tokenParsed?.family_name
        } (${this.getUsername()})`;
    }

    hasRole(roles: Array<string>): boolean {
        return roles.some((role) => this.keycloak.hasRealmRole(role));
    }
}
export default AuthService;
