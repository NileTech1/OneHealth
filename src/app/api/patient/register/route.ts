import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Extract data from the request
        const { userId } = data;

        // Validate required fields
        if (!userId) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        // Check if the patient already exists
        const existingPatient = await prisma.patient.findUnique({
            where: { id: userId },
        });

        if (existingPatient) {
            return NextResponse.json({ error: 'Patient already exists' }, { status: 409 });
        }

        // Create the patient
        const newPatient = await prisma.patient.create({
            data: {
                user: { connect: { id: userId } },
            },
            include: {
                user: true,
            },
        });

        return NextResponse.json(newPatient);
    } catch (error: any) {
        console.error('Error creating patient:', error);
        return NextResponse.json({ error: 'Error creating patient', details: error.message }, { status: 500 });
    }
}
