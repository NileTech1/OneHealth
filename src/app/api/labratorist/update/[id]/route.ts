import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();

    if (!data.userId || !data.password) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const updatedLabratorist = await prisma.labratorist.update({
      where: { id: parseInt(id) },
      data: {
        fieldOfSpeciality: data.fieldOfSpeciality || null,
        password: data.password,
        graduateSchool: data.graduateSchool || null,
      },
    });

    return NextResponse.json(updatedLabratorist);
  } catch (error: any) {
    console.error('Error updating labratorist:', error);
    return NextResponse.json({ error: 'Error updating labratorist', details: error.message }, { status: 500 });
  }
}
