import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      console.error('ID is required but not provided');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log(`Attempting to delete Doctor with id: ${id}`);

    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(id) },
    });

    if (!doctor) {
      console.log(`Doctor with id ${id} not found`);
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    await prisma.doctor.delete({
      where: { id: Number(id) },
    });

    console.log(`Doctor with id ${id} deleted successfully`);

    return NextResponse.json({ message: 'Doctor deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting doctor:', error);

    if (error.message.includes('Invalid JSON')) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error deleting doctor', details: error.message }, { status: 500 });
  }
}
