import {MigrationInterface, QueryRunner} from "typeorm";

export class createTransactionEntityForTestnet1645772288354 implements MigrationInterface {
    name = 'createTransactionEntityForTestnet1645772288354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`moonbeamTestnetTransactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`blockNumber\` int NULL COMMENT '트랜잭션 위치 블록 번호', \`hash\` varchar(255) NOT NULL COMMENT '트랜잭션 해시', \`from\` varchar(255) NOT NULL COMMENT '발신 주소', \`to\` varchar(255) NOT NULL COMMENT '수신 주소', \`value\` varchar(255) NOT NULL COMMENT '송금액', \`gasPrice\` varchar(255) NOT NULL COMMENT '가스 가격', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`moonbeamTestnetTransactions\``);
    }

}
