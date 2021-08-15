import { QueryRunnerAlreadyReleasedError } from "../../error/QueryRunnerAlreadyReleasedError.ts";
import { QueryFailedError } from "../../error/QueryFailedError.ts";
import { AbstractSqliteQueryRunner } from "../sqlite-abstract/AbstractSqliteQueryRunner.ts";
import { CapacitorDriver } from "./CapacitorDriver.ts";
import { Broadcaster } from "../../subscriber/Broadcaster.ts";
import { ObjectLiteral } from "../../common/ObjectLiteral.ts";
import { QueryResult } from "../../query-runner/QueryResult.ts";

/**
 * Runs queries on a single sqlite database connection.
 */
export class CapacitorQueryRunner extends AbstractSqliteQueryRunner {

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(driver: CapacitorDriver) {
        super();
        this.driver = driver;
        this.connection = driver.connection;
        this.broadcaster = new Broadcaster(this);
    }

    async executeSet(set: { statement: string; values?: any[] }[]) {
        if (this.isReleased) throw new QueryRunnerAlreadyReleasedError();

        const databaseConnection = await this.connect();

        return databaseConnection.executeSet(set, false);
    }

    /**
     * Executes a given SQL query.
     */
    async query(query: string, parameters?: any[], useStructuredResult = false): Promise<any> {
        if (this.isReleased) throw new QueryRunnerAlreadyReleasedError();

        const databaseConnection = await this.connect();

        this.driver.connection.logger.logQuery(query, parameters, this);

        const command = query.substr(0, query.indexOf(" "));

        try {
            let raw: any;

            if (
                [ "BEGIN", "ROLLBACK", "COMMIT", "CREATE", "ALTER", "DROP" ].indexOf(
                    command
                ) !== -1
            ) {
                raw = await databaseConnection.execute(query, false);
            } else if ([ "INSERT", "UPDATE", "DELETE" ].indexOf(command) !== -1) {
                raw = await databaseConnection.run(query, parameters, false);
            } else {
                raw = await databaseConnection.query(query, parameters || []);
            }

            const result = new QueryResult();

            if (raw?.hasOwnProperty('values')) {
                result.raw = raw.values;
                result.records = raw.values;
            }

            if (raw?.hasOwnProperty('changes')) {
                result.affected = raw.changes.changes;
                result.raw = raw.changes.lastId || raw.changes.changes;
            }

            if (!useStructuredResult) {
                return result.raw;
            }

            return result;
        } catch (err) {
            this.driver.connection.logger.logQueryError(
                err,
                query,
                parameters,
                this
            );

            throw new QueryFailedError(query, parameters, err);
        }
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------

    /**
     * Parametrizes given object of values. Used to create column=value queries.
     */
    protected parametrize(objectLiteral: ObjectLiteral): string[] {
        return Object.keys(objectLiteral).map((key) => `"${key}"` + "=?");
    }
}
