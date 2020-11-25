import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '../infra/typeorm/entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface CreateOrderProps {
  customer: Customer | undefined;
  products: IProduct[];
}

export interface FindByIdProps {
  order_id: string;
}

export default interface IOrdersRepository {
  create(data: CreateOrderProps): Promise<Order>;
  findById(data: FindByIdProps): Promise<Order | undefined>;
}
