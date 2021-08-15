import {getMetadataArgsStorage} from "../globals.ts";
import {EntityRepositoryMetadataArgs} from "../metadata-args/EntityRepositoryMetadataArgs.ts";
import {EntitySchema} from "../entity-schema/EntitySchema.ts";

/**
 * Used to declare a class as a custom repository.
 * Custom repository can manage some specific entity or just be generic.
 * Custom repository optionally can extend AbstractRepository, Repository or TreeRepository.
 */
export function EntityRepository(entity?: Function | EntitySchema<any>): ClassDecorator {
    return function (target: Function) {

        getMetadataArgsStorage().entityRepositories.push({
            target: target,
            entity: entity,
        } as EntityRepositoryMetadataArgs);
    };
}
