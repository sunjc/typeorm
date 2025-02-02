import {getMetadataArgsStorage} from "../../globals.ts";
import {TableMetadataArgs} from "../../metadata-args/TableMetadataArgs.ts";
import {DiscriminatorValueMetadataArgs} from "../../metadata-args/DiscriminatorValueMetadataArgs.ts";

/**
 * Special type of the table used in the single-table inherited tables.
 */
export function ChildEntity(discriminatorValue?: any): ClassDecorator {
    return function (target: Function) {

        // register a table metadata
        getMetadataArgsStorage().tables.push({
            target: target,
            type: "entity-child",
        } as TableMetadataArgs);

        // register discriminator value if it was provided
        if (typeof discriminatorValue !== 'undefined') {
            getMetadataArgsStorage().discriminatorValues.push({
                target: target,
                value: discriminatorValue
            } as DiscriminatorValueMetadataArgs);
        }
    };
}
