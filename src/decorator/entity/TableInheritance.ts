import {getMetadataArgsStorage} from "../../globals.ts";
import {InheritanceMetadataArgs} from "../../metadata-args/InheritanceMetadataArgs.ts";
import {ColumnOptions} from "../options/ColumnOptions.ts";

/**
 * Sets for entity to use table inheritance pattern.
 */
export function TableInheritance(options?: { pattern?: "STI"/*|"CTI"*/, column?: string|ColumnOptions }): ClassDecorator {
    return function (target: Function) {

        getMetadataArgsStorage().inheritances.push({
            target: target,
            pattern: options && options.pattern ? options.pattern : "STI",
            column: options && options.column ? typeof options.column === "string" ? { name: options.column } : options.column : undefined
        } as InheritanceMetadataArgs);
    };
}
