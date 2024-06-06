import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function PUT(request: Request) {
    try {
        const data = await request.json();

        if (!data.id || !data.email || !data.contact || !data.password) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const updatedSuperAdmin = await prisma.superAdmin.update({
            where: { id: data.id },
            data: {
                email: data.email,
                contact: data.contact,
                password: data.password,
                role: data.role || 'SuperAdmin', // Default role is 'SuperAdmin'
            },
        });
        return NextResponse.json(updatedSuperAdmin);
    } catch (error: any) {
        console.error('Error updating superAdmin:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'SuperAdmin not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Error updating superAdmin', details: error.message }, { status: 500 });
    }
}
