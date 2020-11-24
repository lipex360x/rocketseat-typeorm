import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersProducts20201124180127
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ordersProducts',
        columns: [
          {
            name: 'order_products_id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },

          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },

          {
            name: 'quantity',
            type: 'integer',
          },

          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ordersProducts');
  }
}
