import {importClassesFromDirectories} from "../util/DirectoryExportedClassesLoader.ts";
import {OrmUtils} from "../util/OrmUtils.ts";
import {getFromContainer} from "../container.ts";
import {MigrationInterface} from "../migration/MigrationInterface.ts";
import {getMetadataArgsStorage} from "../globals.ts";
import {EntityMetadataBuilder} from "../metadata-builder/EntityMetadataBuilder.ts";
import {EntitySchemaTransformer} from "../entity-schema/EntitySchemaTransformer.ts";
import {Connection} from "./Connection.ts";
import {EntitySchema} from "../entity-schema/EntitySchema.ts";
import {EntityMetadata} from "../metadata/EntityMetadata.ts";
import {EntitySubscriberInterface} from "../subscriber/EntitySubscriberInterface.ts";

/**
 * Builds migration instances, subscriber instances and entity metadatas for the given classes.
 */
export class ConnectionMetadataBuilder {

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(protected connection: Connection) {
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Builds migration instances for the given classes or directories.
     */
    buildMigrations(migrations: (Function|string)[]): MigrationInterface[] {
        const [migrationClasses, migrationDirectories] = OrmUtils.splitClassesAndStrings(migrations);
        const allMigrationClasses = [...migrationClasses, ...importClassesFromDirectories(this.connection.logger, migrationDirectories)];
        return allMigrationClasses.map(migrationClass => getFromContainer<MigrationInterface>(migrationClass));
    }

    /**
     * Builds subscriber instances for the given classes or directories.
     */
    buildSubscribers(subscribers: (Function|string)[]): EntitySubscriberInterface<any>[] {
        const [subscriberClasses, subscriberDirectories] = OrmUtils.splitClassesAndStrings(subscribers || []);
        const allSubscriberClasses = [...subscriberClasses, ...importClassesFromDirectories(this.connection.logger, subscriberDirectories)];
        return getMetadataArgsStorage()
            .filterSubscribers(allSubscriberClasses)
            .map(metadata => getFromContainer<EntitySubscriberInterface<any>>(metadata.target));
    }

    /**
     * Builds entity metadatas for the given classes or directories.
     */
    buildEntityMetadatas(entities: (Function|EntitySchema<any>|string)[]): EntityMetadata[] {
        // todo: instead we need to merge multiple metadata args storages

        const [entityClassesOrSchemas, entityDirectories] = OrmUtils.splitClassesAndStrings(entities || []);
        const entityClasses: Function[] = entityClassesOrSchemas.filter(entityClass => (entityClass instanceof EntitySchema) === false) as any;
        const entitySchemas: EntitySchema<any>[] = entityClassesOrSchemas.filter(entityClass => entityClass instanceof EntitySchema) as any;

        const allEntityClasses = [...entityClasses, ...importClassesFromDirectories(this.connection.logger, entityDirectories)];
        allEntityClasses.forEach(entityClass => { // if we have entity schemas loaded from directories
            if (entityClass instanceof EntitySchema) {
                entitySchemas.push(entityClass);
            }
        });
        const decoratorEntityMetadatas = new EntityMetadataBuilder(this.connection, getMetadataArgsStorage()).build(allEntityClasses);

        const metadataArgsStorageFromSchema = new EntitySchemaTransformer().transform(entitySchemas);
        const schemaEntityMetadatas = new EntityMetadataBuilder(this.connection, metadataArgsStorageFromSchema).build();

        return [...decoratorEntityMetadatas, ...schemaEntityMetadatas];
    }

}
