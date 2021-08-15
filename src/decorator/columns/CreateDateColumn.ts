import {getMetadataArgsStorage} from "../../globals.ts";
import {ColumnMetadataArgs} from "../../metadata-args/ColumnMetadataArgs.ts";
import { ColumnOptions } from "../options/ColumnOptions.ts";

/**
 * This column will store a creation date of the inserted object.
 * Creation date is generated and inserted only once,
 * at the first time when you create an object, the value is inserted into the table, and is never touched again.
 */
export function CreateDateColumn(options?: ColumnOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        getMetadataArgsStorage().columns.push({
            target: object.constructor,
            propertyName: propertyName,
            mode: "createDate",
            options: options || {}
        } as ColumnMetadataArgs);
    };
}
