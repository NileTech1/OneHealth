import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const doctors = await prisma.doctor.findMany({
            include: {
                user: true, // Include the related user
            }
        });
        return NextResponse.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ error: 'Error fetching doctors' }, { status: 500 });
    }
}
