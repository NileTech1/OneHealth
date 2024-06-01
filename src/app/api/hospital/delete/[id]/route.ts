import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const hospitalId = parseInt(params.id);

    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospital ID' }, { status: 400 });
    }

    await prisma.hospital.delete({
      where: { id: hospitalId },
    });

    return NextResponse.json({ message: 'Hospital deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting hospital:', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Hospital not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error deleting hospital', details: error.message }, { status: 500 });
  }
}
