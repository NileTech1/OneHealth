import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const historys = await prisma.history.findMany();
        return NextResponse.json(historys);
    } catch (error) {
        console.error('Error fetching history entries:', error);
        return NextResponse.json({ error: 'Error fetching history entries' }, { status: 500 });
    }
}
