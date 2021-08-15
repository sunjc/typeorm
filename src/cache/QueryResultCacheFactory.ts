import {RedisQueryResultCache} from "./RedisQueryResultCache.ts";
import {DbQueryResultCache} from "./DbQueryResultCache.ts";
import {QueryResultCache} from "./QueryResultCache.ts";
import {Connection} from "../connection/Connection.ts";
import { TypeORMError } from "../error/TypeORMError.ts";

/**
 * Caches query result into Redis database.
 */
export class QueryResultCacheFactory {

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(protected connection: Connection) {
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Creates a new query result cache based on connection options.
     */
    create(): QueryResultCache {
        if (!this.connection.options.cache)
            throw new TypeORMError(`To use cache you need to enable it in connection options by setting cache: true or providing some caching options. Example: { host: ..., username: ..., cache: true }`);

        const cache: any = this.connection.options.cache;

        if (cache.provider && typeof cache.provider === "function") {
            return cache.provider(this.connection);
        }

        if (cache.type === "redis" || cache.type === "ioredis" || cache.type === "ioredis/cluster") {
            return new RedisQueryResultCache(this.connection, cache.type);
        } else {
            return new DbQueryResultCache(this.connection);
        }
    }

}
