import {Column, CreateDateColumn, UpdateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, Index} from 'typeorm';
import {AccountEntity} from '.';

@Index('indexOfLoginId', ['username'])
@Entity({name: 'wallets'})
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('varchar', {length: 50, unique: true, comment: '로그인 아이디'})
  username: string;

  @Column('varchar', {comment: '로그인 비밀번호'})
  password: string;

  @Column('varchar', {length: 50, comment: '비밀번호 암호화 솔트'})
  salt: string;

  @Column('varchar', {comment: '지갑 pk'})
  praivateKey: string;

  @OneToMany(
    () => AccountEntity,
    accountEntity => accountEntity.wallet
  )
  accounts?: AccountEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
