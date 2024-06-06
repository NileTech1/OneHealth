import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.userId || !data.password) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const createResult = await prisma.doctor.create({
            data: {
                doctorId: parseInt(data.userId), // Convert userId to an integer
                fieldOfSpeciality: data.fieldOfSpeciality || null,
                password: data.password,
                graduateSchool: data.graduateSchool || null,
            },
        });

        return NextResponse.json(createResult);
    } catch (error: any) {
        console.error('Error creating doctor:', error);
        return NextResponse.json({ error: 'Error creating doctor', details: error.message }, { status: 500 });
    }
}
