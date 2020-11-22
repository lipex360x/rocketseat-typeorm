import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export interface CreateCustomerProps {
  name: string;
  email: string;
}

export interface FindByEmailProps {
  email: string;
}

export interface FindByIdProps {
  customer_id: string;
}

export default interface ICustomersRepository {
  create(data: CreateCustomerProps): Promise<Customer>;
  findByEmail(data: FindByEmailProps): Promise<Customer | undefined>;
  findById(data: FindByIdProps): Promise<Customer | undefined>;
}
