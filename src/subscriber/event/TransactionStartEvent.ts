import {EntityManager} from "../../entity-manager/EntityManager.ts";
import {Connection} from "../../connection/Connection.ts";
import {QueryRunner} from "../../query-runner/QueryRunner.ts";

/**
 * TransactionStartEvent is an object that broadcaster sends to the entity subscriber before transaction is started.
 */
export interface TransactionStartEvent {

    /**
     * Connection used in the event.
     */
    connection: Connection;

    /**
     * QueryRunner used in the event transaction.
     * All database operations in the subscribed event listener should be performed using this query runner instance.
     */
    queryRunner: QueryRunner;

    /**
     * EntityManager used in the event transaction.
     * All database operations in the subscribed event listener should be performed using this entity manager instance.
     */
    manager: EntityManager;

}
