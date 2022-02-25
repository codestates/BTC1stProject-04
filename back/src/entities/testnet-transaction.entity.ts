import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import {MoonbeamTransaction} from '../types/transaction';

@Entity({name: 'moonbeamTestnetTransactions'})
export class MoonbeamTestnetTransactionEntity extends BaseEntity implements MoonbeamTransaction {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('int', {nullable: true, comment: '트랜잭션 위치 블록 번호'})
  blockNumber: number | null;
  
  @Column('varchar', {comment: '트랜잭션 해시'})
  hash: string;
  
  @Column('varchar', {comment: '발신 주소'})
  from: string;

  @Column('varchar', {nullable: true, comment: '수신 주소'})
  to: string | null;

  @Column('varchar', {nullable: true, comment: ''})
  creates: string | null;
  
  @Column('varchar', {comment: '송금액'})
  value: string;
  
  @Column('int', {nullable: true, comment:'가스'})
  gas: number | null;

  @Column('varchar', {nullable: true, comment:'가스 가격'})
  gasPrice: string;

  @Column('int', {nullable: true, comment:'넌스 (트랜잭션 중복방지)'})
  nonce: number | null;

  @Column('text', {nullable: true, comment:'추가 인풋 데이터'})
  input: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
