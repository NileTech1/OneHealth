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