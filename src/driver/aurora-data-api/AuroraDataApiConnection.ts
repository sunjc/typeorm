import {AuroraDataApiQueryRunner} from "./AuroraDataApiQueryRunner.ts";
import {Connection} from "../../connection/Connection.ts";
import {ConnectionOptions, QueryRunner} from "../...ts";
import {ReplicationMode} from "../types/ReplicationMode.ts";

/**
 * Organizes communication with MySQL DBMS.
 */
export class AuroraDataApiConnection extends Connection {
    queryRunnter: AuroraDataApiQueryRunner;

    constructor(options: ConnectionOptions, queryRunner: AuroraDataApiQueryRunner) {
        super(options);
        this.queryRunnter = queryRunner;
    }

    public createQueryRunner(mode: ReplicationMode): QueryRunner {
        return this.queryRunnter;
    }

}
