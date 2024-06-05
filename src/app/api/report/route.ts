import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const reports = await prisma.report.findMany();
        return NextResponse.json(reports);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ error: 'Error fetching doctors' }, { status: 500 });
    }
}
