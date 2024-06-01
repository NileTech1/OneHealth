import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    // Validate the request body
    if (!data.firstName || !data.middleName || !data.lastName || !data.contact || !data.age || !data.address || !data.gender) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },  // Convert the id to an integer
      data: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email || null,
        contact: data.contact,
        age: data.age,
        address: data.address,
        gender: data.gender,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error updating user', details: error.message }, { status: 500 });
  }
}
