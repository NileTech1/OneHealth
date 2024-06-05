import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const labratorists = await prisma.labratorist.findMany({
            include: {
                user: true, // Include the related user
            }
        });
        return NextResponse.json(labratorists);
    } catch (error) {
        console.error('Error fetching labratorists:', error);
        return NextResponse.json({ error: 'Error fetching labratorists' }, { status: 500 });
    }
}
