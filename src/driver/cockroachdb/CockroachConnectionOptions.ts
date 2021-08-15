import {BaseConnectionOptions} from "../../connection/BaseConnectionOptions.ts";
import {CockroachConnectionCredentialsOptions} from "./CockroachConnectionCredentialsOptions.ts";

/**
 * Cockroachdb-specific connection options.
 */
export interface CockroachConnectionOptions extends BaseConnectionOptions, CockroachConnectionCredentialsOptions {

    /**
     * Database type.
     */
    readonly type: "cockroachdb";

    /**
     * Schema name.
     */
    readonly schema?: string;

    /**
     * Replication setup.
     */
    readonly replication?: {

        /**
         * Master server used by orm to perform writes.
         */
        readonly master: CockroachConnectionCredentialsOptions;

        /**
         * List of read-from severs (slaves).
         */
        readonly slaves: CockroachConnectionCredentialsOptions[];

    };


    /*
    * Function handling errors thrown by drivers pool.
    * Defaults to logging error with `warn` level.
     */
    readonly poolErrorHandler?: (err: any) => any;

}
