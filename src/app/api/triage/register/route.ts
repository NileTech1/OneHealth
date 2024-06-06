import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { triageId, password, fieldOfSpeciality, graduateSchool, hospitalId } = data;

        // Validate required fields
        if (!triageId || !password || !hospitalId) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const newtriage = await prisma.triage.upsert({
            where: { triageId }, // Assuming userId is unique
            update: {
                password,
                fieldOfSpeciality: fieldOfSpeciality || null,
                graduateSchool: graduateSchool || null

            },
            create: {
                password,
                fieldOfSpeciality: fieldOfSpeciality || null,
                graduateSchool: graduateSchool || null,
                user: { connect: { id: triageId } }, // Connect the user
                hospitals: { connect: { id: hospitalId } }, // Connect the hospital
            },
        });

        return NextResponse.json(newtriage);
    } catch (error: any) {
        console.error('Error creating or updating triage:', error);
        return NextResponse.json({ error: 'Error creating or updating triage', details: error.message }, { status: 500 });
    }
}
