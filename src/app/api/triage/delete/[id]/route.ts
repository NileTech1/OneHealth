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

    console.log(`Attempting to delete Triage with id: ${id}`);

    const triage = await prisma.triage.findUnique({
      where: { id: Number(id) },
    });

    if (!triage) {
      console.log(`Triage with id ${id} not found`);
      return NextResponse.json({ error: 'Triage not found' }, { status: 404 });
    }

    await prisma.triage.delete({
      where: { id: Number(id) },
    });

    console.log(`Triage with id ${id} deleted successfully`);

    return NextResponse.json({ message: 'Triage deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting Triage:', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Triage not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error deleting Triage', details: error.message }, { status: 500 });
  }
}
