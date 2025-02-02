import {getMetadataArgsStorage} from "../../globals.ts";
import {TableMetadataArgs} from "../../metadata-args/TableMetadataArgs.ts";
import {ViewEntityOptions} from "../options/ViewEntityOptions.ts";

/**
 * This decorator is used to mark classes that will be an entity view.
 * Database schema will be created for all classes decorated with it, and Repository can be retrieved and used for it.
 */
export function ViewEntity(options?: ViewEntityOptions): ClassDecorator;

/**
 * This decorator is used to mark classes that will be an entity view.
 * Database schema will be created for all classes decorated with it, and Repository can be retrieved and used for it.
 */
export function ViewEntity(name?: string, options?: ViewEntityOptions): ClassDecorator;

/**
 * This decorator is used to mark classes that will be an entity view.
 * Database schema will be created for all classes decorated with it, and Repository can be retrieved and used for it.
 */
export function ViewEntity(nameOrOptions?: string|ViewEntityOptions, maybeOptions?: ViewEntityOptions): ClassDecorator {
    const options = (typeof nameOrOptions === "object" ? nameOrOptions as ViewEntityOptions : maybeOptions) || {};
    const name = typeof nameOrOptions === "string" ? nameOrOptions : options.name;

    return function (target: Function) {
        getMetadataArgsStorage().tables.push({
            target: target,
            name: name,
            expression: options.expression,
            type: "view",
            database: options.database ? options.database : undefined,
            schema: options.schema ? options.schema : undefined,
            synchronize: options.synchronize === false ? false : true,
            materialized: !!options.materialized
        } as TableMetadataArgs);
    };
}
