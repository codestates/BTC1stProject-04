import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import {MoonbeamTransaction} from '../types/transaction';

@Entity({name: 'moonbeamTransactions'})
export class MoonbeamTransactionEntity extends BaseEntity implements MoonbeamTransaction {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('int', {nullable: true, comment: '트랜잭션 위치 블록 번호'})
  blockNumber: number | null;

  @CreateDateColumn()
  createdAt: Date;
}
