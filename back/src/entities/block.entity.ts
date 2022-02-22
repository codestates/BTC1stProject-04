import {Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import {MoonbeamBlock} from '../types/block';

@Entity({name: 'moonbeamBlocks'})
export class MoonbeamBlockEntity extends BaseEntity implements MoonbeamBlock {
  @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
  id: string;

  @Column('varchar', {comment: '블록해시'})
  hash: string;

  @CreateDateColumn()
  createdAt: Date;
}
