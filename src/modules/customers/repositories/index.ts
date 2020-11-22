import { container } from 'tsyringe';

import ICustomersRepository from './ICustomersRepository';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

const providers = {
  postgres: CustomersRepository,
};

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  providers.postgres,
);
