import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlockEntity1645713257284 implements MigrationInterface {
    name = 'updateBlockEntity1645713257284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` ADD \`transactions\` text NULL COMMENT '블록에 담긴 트랜잭션들'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` CHANGE \`baseFeePerGas\` \`baseFeePerGas\` int NULL COMMENT '가스 당 비용'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` CHANGE \`baseFeePerGas\` \`baseFeePerGas\` int NOT NULL COMMENT '가스 당 비용'`);
        await queryRunner.query(`ALTER TABLE \`moonbeamBlocks\` DROP COLUMN \`transactions\``);
    }

}
