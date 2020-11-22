import { container } from 'tsyringe';

import IProductsRepository from './IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

const providers = {
  postgres: ProductsRepository,
};

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  providers.postgres,
);
