import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const superAdmins = await prisma.superAdmin.findMany();
        return NextResponse.json(superAdmins);
    } catch (error) {
        console.error('Error fetching superAdmins:', error);
        return NextResponse.json({ error: 'Error fetching superAdmins' }, { status: 500 });
    }
}

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



export async function DELETE(request: Request) {
    try {
        // Parse JSON body
        const body = await request.json();

        // Destructure the ID from the parsed body
        const { id } = body;

        // Validate the ID
        if (!id) {
            console.error('ID is required but not provided');
            return NextResponse.json({ error: 'id is required' }, { status: 400 });
        }

        console.log(`Attempting to delete SuperAdmin with id: ${id}`);

        // Check if the SuperAdmin exists
        const superAdmin = await prisma.superAdmin.findUnique({
            where: { id: Number(id) },
        });

        if (!superAdmin) {
            console.log(`SuperAdmin with id ${id} not found`);
            return NextResponse.json({ error: 'SuperAdmin not found' }, { status: 404 });
        }

        // Delete the SuperAdmin
        await prisma.superAdmin.delete({
            where: { id: Number(id) },
        });

        console.log(`SuperAdmin with id ${id} deleted successfully`);

        return NextResponse.json({ message: 'SuperAdmin deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting superAdmin:', error);

        if (error.message.includes('Invalid JSON')) {
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }

        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'SuperAdmin not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Error deleting superAdmin', details: error.message }, { status: 500 });
    }
}
