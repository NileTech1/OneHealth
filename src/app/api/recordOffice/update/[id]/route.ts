import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data.id || !data.userId || !data.password) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: data.id },
      data: {
        userId: data.userId,
        fieldOfSpeciality: data.fieldOfSpeciality || null,
        password: data.password,
        graduateSchool: data.graduateSchool || null,
      },
    });
    return NextResponse.json(updatedDoctor);
  } catch (error: any) {
    console.error('Error updating doctor:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating doctor', details: error.message }, { status: 500 });
  }
}
