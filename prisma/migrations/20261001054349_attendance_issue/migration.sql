/*
  Warnings:

  - The values [MOBILE] on the enum `AttendanceDeviceType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MANUAL] on the enum `AttendanceMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceDeviceType_new" AS ENUM ('FACE', 'BIOMETRIC', 'WEB');
ALTER TABLE "AttendanceDevice" ALTER COLUMN "type" TYPE "AttendanceDeviceType_new" USING ("type"::text::"AttendanceDeviceType_new");
ALTER TYPE "AttendanceDeviceType" RENAME TO "AttendanceDeviceType_old";
ALTER TYPE "AttendanceDeviceType_new" RENAME TO "AttendanceDeviceType";
DROP TYPE "AttendanceDeviceType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceMethod_new" AS ENUM ('FACE', 'BIOMETRIC', 'WEB');
ALTER TABLE "student_attendance" ALTER COLUMN "method" TYPE "AttendanceMethod_new" USING ("method"::text::"AttendanceMethod_new");
ALTER TABLE "teacher_attendance" ALTER COLUMN "method" TYPE "AttendanceMethod_new" USING ("method"::text::"AttendanceMethod_new");
ALTER TABLE "official_attendance" ALTER COLUMN "method" TYPE "AttendanceMethod_new" USING ("method"::text::"AttendanceMethod_new");
ALTER TYPE "AttendanceMethod" RENAME TO "AttendanceMethod_old";
ALTER TYPE "AttendanceMethod_new" RENAME TO "AttendanceMethod";
DROP TYPE "AttendanceMethod_old";
COMMIT;
