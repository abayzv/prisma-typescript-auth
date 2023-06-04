/*
  Warnings:

  - The `paymentMethod` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'Cash';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "type",
ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'Monthly';
