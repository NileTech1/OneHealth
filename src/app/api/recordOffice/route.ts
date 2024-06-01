import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const recordOffices = await prisma.recordOffice.findMany();
        return NextResponse.json(recordOffices);
    } catch (error) {
        console.error('Error fetching record offices:', error);
        return NextResponse.json({ error: 'Error fetching record offices' }, { status: 500 });
    }
}
