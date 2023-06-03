/*
  Warnings:

  - The `paymentMethod` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'Cash';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "type",
ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'Monthly';

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
