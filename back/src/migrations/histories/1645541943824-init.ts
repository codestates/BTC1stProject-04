import {MigrationInterface, QueryRunner} from "typeorm";

export class init1645541943824 implements MigrationInterface {
    name = 'init1645541943824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`moonbeamTransactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`blockNumber\` int NULL COMMENT '트랜잭션 위치 블록 번호', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`moonbeamBlocks\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL COMMENT '블록해시', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`moonbeamBlocks\``);
        await queryRunner.query(`DROP TABLE \`moonbeamTransactions\``);
    }

}
