import {DefaultAuthentication} from "./authentication/DefaultAuthentication.ts";
import {AzureActiveDirectoryAccessTokenAuthentication} from "./authentication/AzureActiveDirectoryAccessTokenAuthentication.ts";
import {AzureActiveDirectoryMsiAppServiceAuthentication} from "./authentication/AzureActiveDirectoryMsiAppServiceAuthentication.ts";
import {AzureActiveDirectoryMsiVmAuthentication} from "./authentication/AzureActiveDirectoryMsiVmAuthentication.ts";
import {AzureActiveDirectoryPasswordAuthentication} from "./authentication/AzureActiveDirectoryPasswordAuthentication.ts";
import {AzureActiveDirectoryServicePrincipalSecret} from "./authentication/AzureActiveDirectoryServicePrincipalSecret.ts";
import {NtlmAuthentication} from "./authentication/NtlmAuthentication.ts";

export type SqlServerConnectionCredentialsAuthenticationOptions =
    DefaultAuthentication
    | NtlmAuthentication
    | AzureActiveDirectoryAccessTokenAuthentication
    | AzureActiveDirectoryMsiAppServiceAuthentication
    | AzureActiveDirectoryMsiVmAuthentication
    | AzureActiveDirectoryPasswordAuthentication
    | AzureActiveDirectoryServicePrincipalSecret

/**
 * SqlServer specific connection credential options.
 */
export interface SqlServerConnectionCredentialsOptions {

    /**
     * Connection url where perform connection to.
     */
    readonly url?: string;

    /**
     * Database host.
     */
    readonly host?: string;

    /**
     * Database host port.
     */
    readonly port?: number;

    /**
     * Database name to connect to.
     */
    readonly database?: string;

    /**
     * Database username.
     */
    readonly username?: string;

    /**
     * Database password.
     */
    readonly password?: string;

    /**
     * Authentication settings
     * It overrides username and password, when passed.
     */
    readonly authentication?: SqlServerConnectionCredentialsAuthenticationOptions

    /**
     * Once you set domain, driver will connect to SQL Server using domain login.
     * @see SqlServerConnectionCredentialsOptions.authentication
     * @see NtlmAuthentication
     * @deprecated
     */
    readonly domain?: string;

}
