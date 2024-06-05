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

    console.log(`Attempting to delete Record Office with id: ${id}`);

    const recordOffice = await prisma.recordOffice.findUnique({
      where: { id: Number(id) },
    });

    if (!recordOffice) {
      console.log(`Record Office with id ${id} not found`);
      return NextResponse.json({ error: 'Record Office not found' }, { status: 404 });
    }

    await prisma.recordOffice.delete({
      where: { id: Number(id) },
    });

    console.log(`Record Office with id ${id} deleted successfully`);

    return NextResponse.json({ message: 'Record Office deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting Record Office:', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Record Office not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error deleting Record Office', details: error.message }, { status: 500 });
  }
}
