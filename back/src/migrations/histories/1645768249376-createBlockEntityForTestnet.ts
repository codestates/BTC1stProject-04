import {MigrationInterface, QueryRunner} from "typeorm";

export class createBlockEntityForTestnet1645768249376 implements MigrationInterface {
    name = 'createBlockEntityForTestnet1645768249376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`moonbeamTestnetBlocks\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` int NOT NULL COMMENT '블럭 번호', \`hash\` varchar(255) NOT NULL COMMENT '블록해시', \`miner\` varchar(255) NOT NULL COMMENT '채굴노드', \`extraData\` varchar(255) NOT NULL COMMENT '추가 데이터', \`gasLimit\` int NOT NULL COMMENT 'Gas Limit', \`gasUsed\` int NOT NULL COMMENT '사용된 가스', \`baseFeePerGas\` int NULL COMMENT '가스 당 비용', \`transactions\` text NULL COMMENT '블록에 담긴 트랜잭션들', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`moonbeamTestnetBlocks\``);
    }

}
