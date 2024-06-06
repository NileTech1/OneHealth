import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



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
