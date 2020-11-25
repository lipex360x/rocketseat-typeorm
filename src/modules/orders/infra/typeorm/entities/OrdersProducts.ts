import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from './Order';

@Entity('ordersProducts')
export default class OrdersProducts {
  @PrimaryColumn('uuid')
  order_products_id: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Product, product => product.ordersProduct)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('uuid')
  product_id: string;

  @ManyToOne(() => Order, order => order.ordersProduct)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('uuid')
  order_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  ordersproductsProps(): void {
    this.order_products_id = uuid();
  }
}
