import {Connection, SelectQueryBuilder} from "../../index.ts";

/**
 * View options.
 */
export interface ViewOptions {

    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------


    /**
     * Database name that this table resides in if it applies.
     */
    database?: string;

    /**
     * Schema name that this table resides in if it applies.
     */
    schema?: string;

    /**
     * View name.
     */
    name: string;

    /**
     * View expression.
     */
    expression: string|((connection: Connection) => SelectQueryBuilder<any>);

    /**
     * Indicates if view is materialized
     */

    materialized?: boolean;
}
