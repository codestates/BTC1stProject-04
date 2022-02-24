import {MigrationInterface, QueryRunner} from "typeorm";

export class createAccountWallet1645702631395 implements MigrationInterface {
    name = 'createAccountWallet1645702631395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`account\` varchar(255) NOT NULL COMMENT '주소', \`walletId\` bigint UNSIGNED NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`indexOfWalletId\` (\`walletId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallets\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL COMMENT '로그인 아이디', \`password\` varchar(255) NOT NULL COMMENT '로그인 비밀번호', \`salt\` varchar(50) NOT NULL COMMENT '비밀번호 암호화 솔트', \`praivateKey\` varchar(255) NOT NULL COMMENT '지갑 pk', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`indexOfLoginId\` (\`username\`), UNIQUE INDEX \`IDX_2591a20569135e2d9b0af5e943\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2591a20569135e2d9b0af5e943\` ON \`wallets\``);
        await queryRunner.query(`DROP INDEX \`indexOfLoginId\` ON \`wallets\``);
        await queryRunner.query(`DROP TABLE \`wallets\``);
        await queryRunner.query(`DROP INDEX \`indexOfWalletId\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
