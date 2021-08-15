import {ObjectType} from "./ObjectType.ts";
import {EntitySchema} from "..";

/**
 * Entity target.
 */
export type EntityTarget<Entity> =
    | ObjectType<Entity>
    | EntitySchema<Entity>
    | string
    | { type: Entity, name: string };
