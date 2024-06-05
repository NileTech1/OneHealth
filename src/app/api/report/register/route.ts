import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { reports, hospitalId, doctorId, patientId, labratoristId } = request.body;

        // Validate required fields
        if (!reports || !hospitalId || !patientId || !labratoristId) {
            return NextResponse.json({ error: 'Required fields are missing' });
        }

        // Create new report entry
        const newReport = await prisma.report.create({
            data: {
                reports,
                hospital: { connect: { id: parseInt(hospitalId) } },
                doctor: doctorId ? { connect: { id: parseInt(doctorId) } } : undefined,
                patient: { connect: { id: parseInt(patientId) } },
                labratorists: { connect: { id: parseInt(labratoristId) } }
            }
        });

        return NextResponse.json(newReport);
    } catch (error: any) {
        console.error('Error creating report entry:', error);
        return NextResponse.json({ error: 'Error creating report entry', details: error.message });
    }
}
