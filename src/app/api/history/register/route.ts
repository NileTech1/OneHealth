import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.cardId || !data.firstName || !data.middleName || !data.lastName || !data.contact || !data.age || !data.address || !data.gender) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const newUser = await prisma.user.upsert({
            where: { cardId: data.cardId },
            update: {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email || null,
                contact: data.contact,
                age: data.age,
                address: data.address,
                gender: data.gender,
            },
            create: {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email || null,
                contact: data.contact,
                age: data.age,
                address: data.address,
                gender: data.gender,
                cardId: data.cardId,
            },
        });
        return NextResponse.json(newUser);
    } catch (error: any) {
        console.error('Error creating or updating user:', error);
        return NextResponse.json({ error: 'Error creating or updating user', details: error.message }, { status: 500 });
    }
}
