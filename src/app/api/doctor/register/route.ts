import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.userId || !data.password) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const upsertResult = await prisma.doctor.upsert({
            where: {
                userId: data.userId,
            },
            update: {
                fieldOfSpeciality: data.fieldOfSpeciality || null,
                password: data.password,
                graduateSchool: data.graduateSchool || null,
            },
            create: {
                userId: data.userId,
                fieldOfSpeciality: data.fieldOfSpeciality || null,
                password: data.password,
                graduateSchool: data.graduateSchool || null,
            },
        });

        return NextResponse.json(upsertResult);
    } catch (error: any) {
        console.error('Error creating doctor:', error);
        return NextResponse.json({ error: 'Error creating doctor', details: error.message }, { status: 500 });
    }
}
