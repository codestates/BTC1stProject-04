import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import {MoonbeamTransaction} from '../types/transaction';

@Entity({name: 'moonbeamTransactions'})
export class MoonbeamTransactionEntity extends BaseEntity implements MoonbeamTransaction {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('int', {nullable: true, comment: '트랜잭션 위치 블록 번호'})
  blockNumber: number | null;
  
  @Column('varchar', {comment: '트랜잭션 해시'})
  hash: string;
  
  @Column('varchar', {comment: '발신 주소'})
  from: string;
  
  @Column('varchar', {comment: '수신 주소'})
  to: string | null;
  
  @Column('varchar', {comment: '송금액'})
  value: string;
  
  @Column('varchar', {comment:'가스 가격'})
  gasPrice: string;

  @CreateDateColumn()
  createdAt: Date;
}
