import { v4 as uuid } from 'uuid';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('customers')
export default class Customer {
  @PrimaryColumn('uuid')
  customer_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  customerProps(): void {
    this.customer_id = uuid();
  }
}
