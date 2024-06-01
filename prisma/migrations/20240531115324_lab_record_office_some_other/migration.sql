/*
  Warnings:

  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cardId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'RecordOffice';

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_patientId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "graduateSchool" TEXT,
ALTER COLUMN "fieldOfSpeciality" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Privilege" ADD COLUMN     "canDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "labratoristId" INTEGER,
ADD COLUMN     "recordOfficeId" INTEGER;

-- AlterTable
ALTER TABLE "SuperAdmin" ADD COLUMN     "contact" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cardId" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Record";

-- CreateTable
CREATE TABLE "RecordOffice" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "fieldOfSpeciality" TEXT,
    "graduateSchool" TEXT,
    "hospitalId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'RecordOffice',

    CONSTRAINT "RecordOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Labratorist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "fieldOfSpeciality" TEXT,
    "graduateSchool" TEXT,
    "recordOfficeId" INTEGER,

    CONSTRAINT "Labratorist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "historyDay" TIMESTAMP(3) NOT NULL,
    "history" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reportedDay" TIMESTAMP(3) NOT NULL,
    "reports" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "doctorId" INTEGER,
    "patientId" INTEGER NOT NULL,
    "labratoristId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HospitalToLabratorist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DoctorToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DoctorToRecordOffice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LabratoristToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PatientToRecordOffice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordOffice_userId_key" ON "RecordOffice"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Labratorist_userId_key" ON "Labratorist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_HospitalToLabratorist_AB_unique" ON "_HospitalToLabratorist"("A", "B");

-- CreateIndex
CREATE INDEX "_HospitalToLabratorist_B_index" ON "_HospitalToLabratorist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorToPatient_AB_unique" ON "_DoctorToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorToPatient_B_index" ON "_DoctorToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorToRecordOffice_AB_unique" ON "_DoctorToRecordOffice"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorToRecordOffice_B_index" ON "_DoctorToRecordOffice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LabratoristToPatient_AB_unique" ON "_LabratoristToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_LabratoristToPatient_B_index" ON "_LabratoristToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToRecordOffice_AB_unique" ON "_PatientToRecordOffice"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToRecordOffice_B_index" ON "_PatientToRecordOffice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_contact_key" ON "SuperAdmin"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "User_cardId_key" ON "User"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordOffice" ADD CONSTRAINT "RecordOffice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordOffice" ADD CONSTRAINT "RecordOffice_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Labratorist" ADD CONSTRAINT "Labratorist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Labratorist" ADD CONSTRAINT "Labratorist_recordOfficeId_fkey" FOREIGN KEY ("recordOfficeId") REFERENCES "RecordOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_labratoristId_fkey" FOREIGN KEY ("labratoristId") REFERENCES "Labratorist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_recordOfficeId_fkey" FOREIGN KEY ("recordOfficeId") REFERENCES "RecordOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labratoristId_fkey" FOREIGN KEY ("labratoristId") REFERENCES "Labratorist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToLabratorist" ADD CONSTRAINT "_HospitalToLabratorist_A_fkey" FOREIGN KEY ("A") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToLabratorist" ADD CONSTRAINT "_HospitalToLabratorist_B_fkey" FOREIGN KEY ("B") REFERENCES "Labratorist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToPatient" ADD CONSTRAINT "_DoctorToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToPatient" ADD CONSTRAINT "_DoctorToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToRecordOffice" ADD CONSTRAINT "_DoctorToRecordOffice_A_fkey" FOREIGN KEY ("A") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToRecordOffice" ADD CONSTRAINT "_DoctorToRecordOffice_B_fkey" FOREIGN KEY ("B") REFERENCES "RecordOffice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabratoristToPatient" ADD CONSTRAINT "_LabratoristToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Labratorist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabratoristToPatient" ADD CONSTRAINT "_LabratoristToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToRecordOffice" ADD CONSTRAINT "_PatientToRecordOffice_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToRecordOffice" ADD CONSTRAINT "_PatientToRecordOffice_B_fkey" FOREIGN KEY ("B") REFERENCES "RecordOffice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
