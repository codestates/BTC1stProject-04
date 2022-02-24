import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import {MoonbeamBlock} from '../types/block';

@Entity({name: 'moonbeamBlocks'})
export class MoonbeamBlockEntity extends BaseEntity implements MoonbeamBlock {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('number', {comment: '블럭 번호'})
  number: number;

  @Column('varchar', {comment: '블록해시'})
  hash: string;

  @Column('varchar', {comment: '채굴노드'})
  miner: string;

  @Column('varchar', {comment: '추가 데이터'})
  extraData: string;
  
  @Column('number', {comment: 'Gas Limit'})
  gasLimit: number;

  @Column('number', {comment: '사용된 가스'})
  gasUsed: number;

  @Column('number', {comment: '가스 당 비용'})
  baseFeePerGas?: number;
  
  @CreateDateColumn()
  createdAt: Date;
}
