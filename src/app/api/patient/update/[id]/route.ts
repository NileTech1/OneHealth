// patient/update/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Update is Not------------ working properly
// Update is Not working properly
// Update is Not working properly------


// Initialize Prisma client
const prisma = new PrismaClient();

export default async function PUT(request: NextApiRequest, { params: { id } }: { params: { id: string } }, res: NextApiResponse) {
  try {
    // Extract userId from the request body
    const { userId } = request.body;

    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    // Update patient's userId
    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: {
        user: {
          connect: { id: parseInt(userId) }
        }
      },
      include: {
        user: true
      }
    });

    return res.status(200).json(updatedPatient);
  } catch (error: any) {
    console.error('Error updating patient:', error);
    return res.status(500).json({ error: 'Error updating patient', details: error.message });
  }
}
