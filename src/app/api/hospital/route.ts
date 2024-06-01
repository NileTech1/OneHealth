import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const hospitals = await prisma.hospital.findMany();
        return NextResponse.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        return NextResponse.json({ error: 'Error fetching hospitals' }, { status: 500 });
    }
}