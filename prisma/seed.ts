import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed SuperAdmin

  // Seed Users, Hospitals, and Doctors
  await prisma.user.create({
    data: {
      firstName: 'John',
      middleName: 'Elon',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      contact: '1234567890',

    },
  });

  // Seed Patients
  await prisma.patient.create({
    data: {
      age: 30,
      address: '789 Maple St, Town',
      gender: 'Male',
      patientId: 123456,
      hospitals: {
        connect: { id: 1 }, // Connect to Hospital A
      },
    },
  });

  // Seed Privileges
  await prisma.privilege.create({
    data: {
      canCreate: false,
      canView: false,
      canUpdate: false,
      hospitalId: 1, // Hospital A
      doctorId: 1, // Assuming Doctor 1 is associated with Hospital A
    },
  });

  // Seed Records
  await prisma.record.create({
    data: {
      recordedDay: new Date(),
      records: 'Sample record data',
      hospitalId: 1, // Hospital A
      doctorId: 1, // Assuming Doctor 1 is associated with Hospital A
      patientId: 123456,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
