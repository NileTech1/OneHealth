import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { userId, password, fieldOfSpeciality, graduateSchool, hospitalId } = data;

        // Validate required fields
        if (!userId || !password || !hospitalId) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const newRecordOffice = await prisma.recordOffice.upsert({
            where: { userId }, // Assuming userId is unique
            update: {
                password,
                fieldOfSpeciality: fieldOfSpeciality || null,
                graduateSchool: graduateSchool || null,
                role: 'RecordOffice'
            },
            create: {
                userId,
                password,
                fieldOfSpeciality: fieldOfSpeciality || null,
                graduateSchool: graduateSchool || null,
                role: 'RecordOffice',
                user: { connect: { id: userId } }, // Connect the user
                hospitals: { connect: { id: hospitalId } }, // Connect the hospital
            },
        });

        return NextResponse.json(newRecordOffice);
    } catch (error: any) {
        console.error('Error creating or updating record office:', error);
        return NextResponse.json({ error: 'Error creating or updating record office', details: error.message }, { status: 500 });
    }
}
