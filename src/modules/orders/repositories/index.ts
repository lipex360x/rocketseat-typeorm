import { container } from 'tsyringe';

import IOrdersRepository from './IOrdersRepository';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

const providers = {
  postgres: OrdersRepository,
};

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  providers.postgres,
);
