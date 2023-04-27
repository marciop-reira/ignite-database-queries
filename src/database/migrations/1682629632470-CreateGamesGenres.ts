import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class CreateGamesGenres1682629632470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "games_genres",
                columns: [
                    {
                        name: "game_id",
                        type: "uuid"
                    },
                    {
                        name: "genre_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: "games_genres_game_id_fkey",
                        columnNames: ["game_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "games",
                        onDelete: "CASCADE"
                    }),
                    new TableForeignKey({
                        name: "games_genres_genre_id_fkey",
                        columnNames: ["genre_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "genres",
                        onDelete: "CASCADE"
                    })
                ],
                indices: [
                    new TableIndex({
                        columnNames: ["game_id"],
                    }),
                    new TableIndex({
                        columnNames: ["genre_id"],
                    }),
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("games_genres");

        await queryRunner.dropForeignKeys("games_genres", table?.foreignKeys!);
        await queryRunner.dropTable("games_genres");
    }

}
