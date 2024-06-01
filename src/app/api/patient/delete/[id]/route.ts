import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const patientId = parseInt(params.id);

    if (isNaN(patientId)) {
      return NextResponse.json({ error: 'Invalid patient ID' }, { status: 400 });
    }

    // Retrieve patient details before deletion
    const deletedPatient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!deletedPatient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    // Delete the patient
    await prisma.patient.delete({
      where: { id: patientId },
    });

    return NextResponse.json({ message: 'Patient deleted successfully', deletedPatient });
  } catch (error: any) {
    console.error('Error deleting patient:', error);

    return NextResponse.json({ error: 'Error deleting patient', details: error.message }, { status: 500 });
  }
}
