import { dirname } from 'https://deno.land/std/path/mod.ts';
import { DriverPackageNotInstalledError } from "../../error/DriverPackageNotInstalledError.ts";
import { SqliteQueryRunner } from "./SqliteQueryRunner.ts";
import { DriverOptionNotSetError } from "../../error/DriverOptionNotSetError.ts";
import { PlatformTools } from "../../platform/PlatformTools.ts";
import { Connection } from "../../connection/Connection.ts";
import { SqliteConnectionOptions } from "./SqliteConnectionOptions.ts";
import { ColumnType } from "../types/ColumnTypes.ts";
import { QueryRunner } from "../../query-runner/QueryRunner.ts";
import { AbstractSqliteDriver } from "../sqlite-abstract/AbstractSqliteDriver.ts";
import {ReplicationMode} from "../types/ReplicationMode.ts";

/**
 * Organizes communication with sqlite DBMS.
 */
export class SqliteDriver extends AbstractSqliteDriver {

    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------

    /**
     * Connection options.
     */
    options: SqliteConnectionOptions;

    /**
     * SQLite underlying library.
     */
    sqlite: any;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(connection: Connection) {
        super(connection);

        this.connection = connection;
        this.options = connection.options as SqliteConnectionOptions;
        this.database = this.options.database;

        // validate options to make sure everything is set
        if (!this.options.database)
            throw new DriverOptionNotSetError("database");

        // load sqlite package
        this.loadDependencies();
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Closes connection with database.
     */
    async disconnect(): Promise<void> {
        return new Promise<void>((ok, fail) => {
            this.queryRunner = undefined;
            this.databaseConnection.close((err: any) => err ? fail(err) : ok());
        });
    }

    /**
     * Creates a query runner used to execute database queries.
     */
    createQueryRunner(mode: ReplicationMode): QueryRunner {
        if (!this.queryRunner)
            this.queryRunner = new SqliteQueryRunner(this);

        return this.queryRunner;
    }

    normalizeType(column: { type?: ColumnType, length?: number | string, precision?: number | null, scale?: number }): string {

        return super.normalizeType(column);
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------

    /**
     * Creates connection with the database.
     */
    protected async createDatabaseConnection() {
        await this.createDatabaseDirectory(this.options.database);

        const databaseConnection: any = await new Promise((ok, fail) => {
            const connection = new this.sqlite.Database(this.options.database, (err: any) => {
                if (err) return fail(err);
                ok(connection);
            });
        });

        // Internal function to run a command on the connection and fail if an error occured.
        function run(line: string): Promise<void> {
            return new Promise((ok, fail) => {
                databaseConnection.run(line, (err: any) => {
                    if (err) return fail(err);
                    ok();
                });
            });
        }

        if (this.options.enableWAL) {
            await run(`PRAGMA journal_mode = WAL;`);
        }

        // we need to enable foreign keys in sqlite to make sure all foreign key related features
        // working properly. this also makes onDelete to work with sqlite.
        await run(`PRAGMA foreign_keys = ON;`);

        // in the options, if encryption key for SQLCipher is setted.
        if (this.options.key) {
            await run(`PRAGMA key = ${JSON.stringify(this.options.key)};`);
        }

        return databaseConnection;
    }

    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    protected loadDependencies(): void {
        try {
            this.sqlite = PlatformTools.load("sqlite3").verbose();

        } catch (e) {
            throw new DriverPackageNotInstalledError("SQLite", "sqlite3");
        }
    }

    /**
     * Auto creates database directory if it does not exist.
     */
    protected async createDatabaseDirectory(fullPath: string): Promise<void> {
        await Deno.mkdir(dirname(fullPath));
    }

}
