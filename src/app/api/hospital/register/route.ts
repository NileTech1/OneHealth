import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, address, password, hospitaladminId, superAdminId, role } = data;

        // Validate required fields
        if (!name || !address || !password || !hospitaladminId || !superAdminId) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        const newHospital = await prisma.hospital.upsert({
            where: { hospitaladminId }, // Assuming adminId is unique
            update: {
                name,
                address,
                password,
                superAdminId,
                role: role || 'HospitalAdmin', // Default role is 'HospitalAdmin'
            },
            create: {
                name,
                address,
                password,
                hospitaladminId,
                superAdminId,
                role: role || 'HospitalAdmin', // Default role is 'HospitalAdmin'
            },
        });
        return NextResponse.json(newHospital);
    } catch (error: any) {
        console.error('Error creating or updating hospital:', error);
        return NextResponse.json({ error: 'Error creating or updating hospital', details: error.message }, { status: 500 });
    }
}
