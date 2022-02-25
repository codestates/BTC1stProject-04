import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import {MoonbeamBlock} from '../types/block';

@Entity({name: 'moonbeamTestnetBlocks'})
export class MoonbeamTestnetBlockEntity extends BaseEntity implements MoonbeamBlock {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('int', {comment: '블럭 번호'})
  number: number;

  @Column('varchar', {comment: '블록해시'})
  hash: string;

  @Column('varchar', {comment: '채굴노드'})
  miner: string;

  @Column('varchar', {comment: '추가 데이터'})
  extraData: string;
  
  @Column('int', {comment: 'Gas Limit'})
  gasLimit: number;

  @Column('int', {comment: '사용된 가스'})
  gasUsed: number;

  @Column('int', {nullable: true, comment: '가스 당 비용'})
  baseFeePerGas?: number;

  @Column('simple-array', {nullable: true, comment: '블록에 담긴 트랜잭션들'})
  transactions: string[];
  
  @CreateDateColumn()
  createdAt: Date;
}
