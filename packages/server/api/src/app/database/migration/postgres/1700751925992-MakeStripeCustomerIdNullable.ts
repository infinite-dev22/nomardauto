import { logger } from '@activepieces/server-shared'
import { ApEdition } from '@activepieces/shared'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { isNotOneOfTheseEditions } from '../../database-common'

export class MakeStripeCustomerIdNullable1700751925992
implements MigrationInterface {
    name = 'MakeStripeCustomerIdNullable1700751925992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (isNotOneOfTheseEditions([ApEdition.CLOUD, ApEdition.ENTERPRISE])) {
            return
        }
        logger.info('MakeStripeCustomerIdNullable1700751925992 is up')
        await queryRunner.query(`
            ALTER TABLE "project_plan"
            ALTER COLUMN "stripeCustomerId" DROP NOT NULL
        `)
        await queryRunner.query(`
        DROP INDEX "idx_plan_stripe_customer_id"
    `)
        logger.info('MakeStripeCustomerIdNullable1700751925992 finished')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (isNotOneOfTheseEditions([ApEdition.CLOUD, ApEdition.ENTERPRISE])) {
            return
        }
        logger.info('MakeStripeCustomerIdNullable1700751925992 is down')
        await queryRunner.query(`
            ALTER TABLE "project_plan"
            ALTER COLUMN "stripeCustomerId"
            SET NOT NULL
        `)
        await queryRunner.query(`
        CREATE UNIQUE INDEX "idx_plan_stripe_customer_id" ON "project_plan" ("stripeCustomerId")
    `)
    }
}
