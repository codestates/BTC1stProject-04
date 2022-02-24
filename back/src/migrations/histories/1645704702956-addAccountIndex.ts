import {MigrationInterface, QueryRunner} from "typeorm";

export class addAccountIndex1645704702956 implements MigrationInterface {
    name = 'addAccountIndex1645704702956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`indexOfAccount\` ON \`accounts\` (\`account\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`indexOfAccount\` ON \`accounts\``);
    }

}
