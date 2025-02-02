import {Driver} from "../Driver.ts";
import {PostgresDriver} from "../postgres/PostgresDriver.ts";
import {PlatformTools} from "../../platform/PlatformTools.ts";
import {Connection} from "../../connection/Connection.ts";
import {AuroraDataApiPostgresConnectionOptions} from "../aurora-data-api-pg/AuroraDataApiPostgresConnectionOptions.ts";
import {AuroraDataApiPostgresQueryRunner} from "../aurora-data-api-pg/AuroraDataApiPostgresQueryRunner.ts";
import {ReplicationMode} from "../types/ReplicationMode.ts";
import {ColumnMetadata} from "../../metadata/ColumnMetadata.ts";
import {ApplyValueTransformers} from "../../util/ApplyValueTransformers.ts";
import {DriverUtils} from "../DriverUtils.ts";

abstract class PostgresWrapper extends PostgresDriver {
    options: any;

    abstract createQueryRunner(mode: ReplicationMode): any;
}

export class AuroraDataApiPostgresDriver extends PostgresWrapper implements Driver {

    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------

    /**
     * Connection used by driver.
     */
    connection: Connection;

    /**
     * Aurora Data API underlying library.
     */
    DataApiDriver: any;

    client: any;

    // -------------------------------------------------------------------------
    // Public Implemented Properties
    // -------------------------------------------------------------------------

    /**
     * Connection options.
     */
    options: AuroraDataApiPostgresConnectionOptions;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(connection: Connection) {
        super();
        this.connection = connection;
        this.options = connection.options as AuroraDataApiPostgresConnectionOptions;
        this.isReplicated = false;

        // load data-api package
        this.loadDependencies();

        this.client = new this.DataApiDriver(
            this.options.region,
            this.options.secretArn,
            this.options.resourceArn,
            this.options.database,
            (query: string, parameters?: any[]) => this.connection.logger.logQuery(query, parameters),
            this.options.serviceConfigOptions,
            this.options.formatOptions,
        );

        this.database = DriverUtils.buildDriverOptions(this.options).database;
    }

    // -------------------------------------------------------------------------
    // Public Implemented Methods
    // -------------------------------------------------------------------------

    /**
     * Performs connection to the database.
     * Based on pooling options, it can either create connection immediately,
     * either create a pool and create connection when needed.
     */
    async connect(): Promise<void> {
    }

    /**
     * Closes connection with database.
     */
    async disconnect(): Promise<void> {
    }

    /**
     * Creates a query runner used to execute database queries.
     */
    createQueryRunner(mode: ReplicationMode) {
        return new AuroraDataApiPostgresQueryRunner(
            this,
            new this.DataApiDriver(
                this.options.region,
                this.options.secretArn,
                this.options.resourceArn,
                this.options.database,
                (query: string, parameters?: any[]) => this.connection.logger.logQuery(query, parameters),
                this.options.serviceConfigOptions,
                this.options.formatOptions,
            ),
            mode
        );
    }

    /**
     * Prepares given value to a value to be persisted, based on its column type and metadata.
     */
    preparePersistentValue(value: any, columnMetadata: ColumnMetadata): any {
        if (this.options.formatOptions && this.options.formatOptions.castParameters === false) {
            return super.preparePersistentValue(value, columnMetadata)
        }

        if (columnMetadata.transformer)
            value = ApplyValueTransformers.transformTo(columnMetadata.transformer, value);

        return this.client.preparePersistentValue(value, columnMetadata)
    }

    /**
     * Prepares given value to a value to be persisted, based on its column type and metadata.
     */
    prepareHydratedValue(value: any, columnMetadata: ColumnMetadata): any {
        if (this.options.formatOptions && this.options.formatOptions.castParameters === false) {
            return super.prepareHydratedValue(value, columnMetadata)
        }

        if (columnMetadata.transformer)
            value = ApplyValueTransformers.transformFrom(columnMetadata.transformer, value);

        return this.client.prepareHydratedValue(value, columnMetadata)
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------

    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    protected loadDependencies(): void {
        const { pg } = PlatformTools.load("typeorm-aurora-data-api-driver");

        this.DataApiDriver = pg;
    }

    /**
     * Executes given query.
     */
    protected executeQuery(connection: any, query: string) {
        return this.connection.query(query);
    }

    /**
     * Makes any action after connection (e.g. create extensions in Postgres driver).
     */
    async afterConnect(): Promise<void> {
        const extensionsMetadata = await this.checkMetadataForExtensions();

        if (extensionsMetadata.hasExtensions) {
            await this.enableExtensions(extensionsMetadata, this.connection);
        }

        return Promise.resolve();
    }
}
