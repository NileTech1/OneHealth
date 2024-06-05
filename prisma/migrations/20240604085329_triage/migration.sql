-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HospitalAdmin', 'SuperAdmin', 'RecordOffice');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "email" TEXT,
    "contact" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SuperAdmin',

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" SERIAL NOT NULL,
    "hospitaladminId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "superAdminId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'HospitalAdmin',

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "fieldOfSpeciality" TEXT,
    "graduateSchool" TEXT,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Triage" (
    "id" SERIAL NOT NULL,
    "triageId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "fieldOfSpeciality" TEXT,
    "graduateSchool" TEXT,

    CONSTRAINT "Triage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Privilege" (
    "id" SERIAL NOT NULL,
    "canCreate" BOOLEAN NOT NULL DEFAULT false,
    "canView" BOOLEAN NOT NULL DEFAULT false,
    "canUpdate" BOOLEAN NOT NULL DEFAULT false,
    "canDelete" BOOLEAN NOT NULL DEFAULT false,
    "hospitalId" INTEGER,
    "doctorId" INTEGER,
    "labratoristId" INTEGER,
    "recordOfficeId" INTEGER,
    "triageId" INTEGER,

    CONSTRAINT "Privilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "historyDay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "history" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reportedDay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reports" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "labratoristId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriageReport" (
    "id" SERIAL NOT NULL,
    "triagedDay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triageReports" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "triageId" INTEGER NOT NULL,

    CONSTRAINT "TriageReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HospitalToTriage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HospitalToLabratorist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HospitalToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RecordOfficeToTriage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DoctorToHospital" (
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

-- CreateTable
CREATE TABLE "_PatientToTriage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cardId_key" ON "User"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_id_key" ON "SuperAdmin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_contact_key" ON "SuperAdmin"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_hospitaladminId_key" ON "Hospital"("hospitaladminId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordOffice_userId_key" ON "RecordOffice"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorId_key" ON "Doctor"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Labratorist_userId_key" ON "Labratorist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Triage_triageId_key" ON "Triage"("triageId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patientId_key" ON "Patient"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "_HospitalToTriage_AB_unique" ON "_HospitalToTriage"("A", "B");

-- CreateIndex
CREATE INDEX "_HospitalToTriage_B_index" ON "_HospitalToTriage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HospitalToLabratorist_AB_unique" ON "_HospitalToLabratorist"("A", "B");

-- CreateIndex
CREATE INDEX "_HospitalToLabratorist_B_index" ON "_HospitalToLabratorist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HospitalToPatient_AB_unique" ON "_HospitalToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_HospitalToPatient_B_index" ON "_HospitalToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecordOfficeToTriage_AB_unique" ON "_RecordOfficeToTriage"("A", "B");

-- CreateIndex
CREATE INDEX "_RecordOfficeToTriage_B_index" ON "_RecordOfficeToTriage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorToHospital_AB_unique" ON "_DoctorToHospital"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorToHospital_B_index" ON "_DoctorToHospital"("B");

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
CREATE UNIQUE INDEX "_PatientToTriage_AB_unique" ON "_PatientToTriage"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToTriage_B_index" ON "_PatientToTriage"("B");

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_hospitaladminId_fkey" FOREIGN KEY ("hospitaladminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "SuperAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordOffice" ADD CONSTRAINT "RecordOffice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordOffice" ADD CONSTRAINT "RecordOffice_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Labratorist" ADD CONSTRAINT "Labratorist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Labratorist" ADD CONSTRAINT "Labratorist_recordOfficeId_fkey" FOREIGN KEY ("recordOfficeId") REFERENCES "RecordOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Triage" ADD CONSTRAINT "Triage_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_labratoristId_fkey" FOREIGN KEY ("labratoristId") REFERENCES "Labratorist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_recordOfficeId_fkey" FOREIGN KEY ("recordOfficeId") REFERENCES "RecordOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "Triage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labratoristId_fkey" FOREIGN KEY ("labratoristId") REFERENCES "Labratorist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageReport" ADD CONSTRAINT "TriageReport_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageReport" ADD CONSTRAINT "TriageReport_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageReport" ADD CONSTRAINT "TriageReport_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "Triage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToTriage" ADD CONSTRAINT "_HospitalToTriage_A_fkey" FOREIGN KEY ("A") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToTriage" ADD CONSTRAINT "_HospitalToTriage_B_fkey" FOREIGN KEY ("B") REFERENCES "Triage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToLabratorist" ADD CONSTRAINT "_HospitalToLabratorist_A_fkey" FOREIGN KEY ("A") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToLabratorist" ADD CONSTRAINT "_HospitalToLabratorist_B_fkey" FOREIGN KEY ("B") REFERENCES "Labratorist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToPatient" ADD CONSTRAINT "_HospitalToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToPatient" ADD CONSTRAINT "_HospitalToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordOfficeToTriage" ADD CONSTRAINT "_RecordOfficeToTriage_A_fkey" FOREIGN KEY ("A") REFERENCES "RecordOffice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordOfficeToTriage" ADD CONSTRAINT "_RecordOfficeToTriage_B_fkey" FOREIGN KEY ("B") REFERENCES "Triage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToHospital" ADD CONSTRAINT "_DoctorToHospital_A_fkey" FOREIGN KEY ("A") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToHospital" ADD CONSTRAINT "_DoctorToHospital_B_fkey" FOREIGN KEY ("B") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "_PatientToTriage" ADD CONSTRAINT "_PatientToTriage_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToTriage" ADD CONSTRAINT "_PatientToTriage_B_fkey" FOREIGN KEY ("B") REFERENCES "Triage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
