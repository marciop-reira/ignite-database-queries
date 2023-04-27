import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class CreateOrdersGames1682631522204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orders_games",
                columns: [
                    {
                        name: "order_id",
                        type: "uuid"
                    },
                    {
                        name: "game_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: "orders_games_order_id_fkey",
                        columnNames: ["order_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "orders"
                    }),
                    new TableForeignKey({
                        name: "orders_games_games_id_fkey",
                        columnNames: ["game_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "games"
                    })
                ],
                indices: [
                    new TableIndex({
                        columnNames: ["order_id"],
                    }),
                    new TableIndex({
                        columnNames: ["game_id"],
                    }),
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("orders_games");

        await queryRunner.dropForeignKeys("orders_games", table?.foreignKeys!);
        await queryRunner.dropTable("orders_games");
    }

}
