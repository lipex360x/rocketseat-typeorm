import { v4 as uuid } from 'uuid';
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
export default class Order {
  @PrimaryColumn('uuid')
  order_id: string;

  @ManyToOne(() => Customer, customer => customer.order)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, ordersProduct => ordersProduct.order, {
    cascade: true,
  })
  ordersProduct: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  orderProps(): void {
    this.order_id = uuid();
  }
}
