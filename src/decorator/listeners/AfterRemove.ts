import {getMetadataArgsStorage} from "../../globals.ts";
import {EventListenerTypes} from "../../metadata/types/EventListenerTypes.ts";
import {EntityListenerMetadataArgs} from "../../metadata-args/EntityListenerMetadataArgs.ts";

/**
 * Calls a method on which this decorator is applied after this entity removal.
 */
export function AfterRemove(): PropertyDecorator {
    return function (object: Object, propertyName: string) {

        getMetadataArgsStorage().entityListeners.push({
            target: object.constructor,
            propertyName: propertyName,
            type: EventListenerTypes.AFTER_REMOVE
        } as EntityListenerMetadataArgs);
    };
}
