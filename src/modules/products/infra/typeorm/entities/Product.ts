import { v4 as uuid } from 'uuid';

import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryColumn,
  Entity,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  product_id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  productsProps(): void {
    this.product_id = uuid();
  }
}

export default Product;
