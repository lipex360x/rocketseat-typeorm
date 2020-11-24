import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class FKProductIdInOrdersProducts20201124181151
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ordersProducts',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'ordersProducts',
      new TableForeignKey({
        name: 'OrderProductsToProduct',
        columnNames: ['product_id'],

        referencedTableName: 'products',
        referencedColumnNames: ['product_id'],

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ordersProducts',
      'OrderProductsToProduct',
    );
    await queryRunner.dropColumn('ordersProducts', 'product_id');
  }
}
