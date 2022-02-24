import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn} from 'typeorm';
import {WalletEntity} from '.';

@Index('indexOfWalletId', ['walletId'])
@Index('indexOfAccount', ['account'])
@Entity({name: 'accounts'})
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('varchar', {comment: '주소'})
  account: string;

  @ManyToOne(
    () => WalletEntity,
    walletEntity => walletEntity.accounts,
    {
      createForeignKeyConstraints: false,
      nullable: false,
    }
  )
  @JoinColumn({name: 'walletId', referencedColumnName: 'id'})
  wallet: WalletEntity;

  @Column('bigint', {unsigned: true})
  walletId: string;

  @CreateDateColumn()
  createdAt: Date;

  // 계정 잔액
  balance?: string;
}
