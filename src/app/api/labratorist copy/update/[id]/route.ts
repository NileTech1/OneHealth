import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Fetch the existing labratorist
    const existingLabratorist = await prisma.labratorist.findUnique({
      where: { id: Number(id) },
    });

    if (!existingLabratorist) {
      return NextResponse.json({ error: 'Labratorist not found' }, { status: 404 });
    }

    // Check if userId is provided and is changing
    if (data.userId && existingLabratorist.userId !== data.userId) {
      const userIdExists = await prisma.labratorist.findUnique({
        where: { userId: data.userId },
      });

      if (userIdExists) {
        return NextResponse.json({ error: 'userId already exists for another labratorist' }, { status: 400 });
      }
    }

    // Update the labratorist with the provided data
    const updatedLabratorist = await prisma.labratorist.update({
      where: { id: Number(id) },
      data: {
        userId: data.userId !== undefined ? data.userId : existingLabratorist.userId,
        fieldOfSpeciality: data.fieldOfSpeciality !== undefined ? data.fieldOfSpeciality : existingLabratorist.fieldOfSpeciality,
        password: data.password !== undefined ? data.password : existingLabratorist.password,
        graduateSchool: data.graduateSchool !== undefined ? data.graduateSchool : existingLabratorist.graduateSchool,
      },
    });
    return NextResponse.json(updatedLabratorist);
  } catch (error: any) {
    console.error('Error updating labratorist:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Labratorist not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating labratorist', details: error.message }, { status: 500 });
  }
}
