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

    console.log(`Attempting to delete labratorist with id: ${id}`);

    const labratorist = await prisma.labratorist.findUnique({
      where: { id: Number(id) },
    });

    if (!labratorist) {
      console.log(`Labratorist with id ${id} not found`);
      return NextResponse.json({ error: 'Labratorist not found' }, { status: 404 });
    }

    await prisma.labratorist.delete({
      where: { id: Number(id) },
    });

    console.log(`Labratorist with id ${id} deleted successfully`);

    return NextResponse.json({ message: 'Labratorist deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting labratorist:', error);

    if (error.message.includes('Invalid JSON')) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Labratorist not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error deleting labratorist', details: error.message }, { status: 500 });
  }
}
