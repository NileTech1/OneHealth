import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const triages = await prisma.triage.findMany();
        return NextResponse.json(triages);
    } catch (error) {
        console.error('Error fetching record offices:', error);
        return NextResponse.json({ error: 'Error fetching record offices' }, { status: 500 });
    }
}
