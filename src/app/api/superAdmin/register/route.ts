import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.id || !data.email || !data.contact || !data.password) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const newSuperAdmin = await prisma.superAdmin.upsert({
            where: { id: data.id }, // Using id as the unique identifier
            update: {
                email: data.email,
                contact: data.contact,
                password: data.password,
                role: data.role || 'SuperAdmin', // Default role is 'SuperAdmin'
            },
            create: {
                id: data.id,
                email: data.email,
                contact: data.contact,
                password: data.password,
                role: data.role || 'SuperAdmin', // Default role is 'SuperAdmin'
            },
        });
        return NextResponse.json(newSuperAdmin);
    } catch (error: any) {
        console.error('Error creating or updating superAdmin:', error);
        return NextResponse.json({ error: 'Error creating or updating superAdmin', details: error.message }, { status: 500 });
    }
}
