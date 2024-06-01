import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { id } = params;
    const { name, fieldOfSpeciality, graduateSchool, hospitalId, password } = data;

    // Validate required fields
    if (!id || (!name && !fieldOfSpeciality && !graduateSchool && !hospitalId && !password)) {
      return NextResponse.json({ error: 'No data provided for update or missing ID' }, { status: 400 });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: Number(id) },
      data: {

        fieldOfSpeciality,
        graduateSchool,
        password,
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
