import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlockAndTransaction1645711129519 implements MigrationInterface {
    name = 'updateBlockAndTransaction1645711129519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`number\` int NOT NULL COMMENT '블럭 번호'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`miner\` varchar(255) NOT NULL COMMENT '채굴노드'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`extraData\` varchar(255) NOT NULL COMMENT '추가 데이터'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`gasLimit\` int NOT NULL COMMENT 'Gas Limit'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`gasUsed\` int NOT NULL COMMENT '사용된 가스'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`baseFeePerGas\` int NOT NULL COMMENT '가스 당 비용'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` ADD \`hash\` varchar(255) NOT NULL COMMENT '트랜잭션 해시'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` ADD \`from\` varchar(255) NOT NULL COMMENT '발신 주소'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` ADD \`to\` varchar(255) NOT NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` ADD \`value\` varchar(255) NOT NULL COMMENT '송금액'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` ADD \`gasPrice\` varchar(255) NOT NULL COMMENT '가스 가격'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` DROP COLUMN \`gasPrice\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` DROP COLUMN \`to\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` DROP COLUMN \`from\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` DROP COLUMN \`hash\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`baseFeePerGas\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`gasUsed\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`gasLimit\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`extraData\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`miner\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`number\``);
    }

}
