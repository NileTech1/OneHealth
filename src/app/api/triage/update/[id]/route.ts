import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { id } = params;
    const { triageId, password, fieldOfSpeciality, graduateSchool } = data;

    // Validate required fields
    if (!id || !triageId || !password) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const updatedTriage = await prisma.triage.update({
      where: { id: Number(id) },
      data: {
        triageId,
        password,
        fieldOfSpeciality: fieldOfSpeciality || null,
        graduateSchool: graduateSchool || null,
      },
    });

    return NextResponse.json(updatedTriage);
  } catch (error: any) {
    console.error('Error updating triage:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Triage not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating triage', details: error.message }, { status: 500 });
  }
}
