import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { id } = params;
    const { name, address, password, adminId, superAdminId, role } = data;

    // Validate required fields
    if (!id || (!name && !address && !password && !adminId && !superAdminId && !role)) {
      return NextResponse.json({ error: 'No data provided for update or missing ID' }, { status: 400 });
    }

    const updatedHospital = await prisma.hospital.update({
      where: { id: Number(id) },
      data: {
        name,
        address,
        password,
        adminId,
        superAdminId,
        role: role || 'HospitalAdmin', // Default role is 'HospitalAdmin'
      },
    });
    return NextResponse.json(updatedHospital);
  } catch (error: any) {
    console.error('Error updating hospital:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Hospital not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating hospital', details: error.message }, { status: 500 });
  }
}
