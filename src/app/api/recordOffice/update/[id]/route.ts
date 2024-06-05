import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//  Update Is Not Working
//  Update Is Not Working
//  Update Is Not Working
//  Update Is Not Working


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { id } = params;
    const { userId, password, fieldOfSpeciality, graduateSchool } = data;

    // Validate required fields
    if (!id || !userId || !password) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const updatedRecordOffice = await prisma.recordOffice.update({
      where: { id: Number(id) },
      data: {
        userId,
        fieldOfSpeciality: fieldOfSpeciality || null,
        password,
        graduateSchool: graduateSchool || null,
      },
    });

    return NextResponse.json(updatedRecordOffice);
  } catch (error: any) {
    console.error('Error updating record office:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Record office not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating record office', details: error.message }, { status: 500 });
  }
}
