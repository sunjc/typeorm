import {ObjectType} from "./ObjectType.ts";
import {EntitySchema} from "../index.ts";

/**
 * Entity target.
 */
export type EntityTarget<Entity> =
    | ObjectType<Entity>
    | EntitySchema<Entity>
    | string
    | { type: Entity, name: string };
