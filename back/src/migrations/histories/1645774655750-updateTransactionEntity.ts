import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTransactionEntity1645774655750 implements MigrationInterface {
    name = 'updateTransactionEntity1645774655750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` ADD \`creates\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` ADD \`creates\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` ADD \`gas\` int NULL COMMENT '가스'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` ADD \`nonce\` int NULL COMMENT '넌스 (트랜잭션 중복방지)'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` ADD \`input\` text NULL COMMENT '추가 인풋 데이터'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` CHANGE \`to\` \`to\` varchar(255) NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` CHANGE \`to\` \`to\` varchar(255) NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` CHANGE \`gasPrice\` \`gasPrice\` varchar(255) NULL COMMENT '가스 가격'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` CHANGE \`gasPrice\` \`gasPrice\` varchar(255) NOT NULL COMMENT '가스 가격'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` CHANGE \`to\` \`to\` varchar(255) NOT NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` CHANGE \`to\` \`to\` varchar(255) NOT NULL COMMENT '수신 주소'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` DROP COLUMN \`nonce\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` DROP COLUMN \`gas\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTestnetTransactions\` DROP COLUMN \`creates\``);
        await queryRunner.query(`ALTER TABLE \`moonbeamTransactions\` DROP COLUMN \`creates\``);
    }

}
