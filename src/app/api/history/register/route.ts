// history/register/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
        const { historyDay, history, hospitalId, doctorId, patientId } = request.body;

        // Validate required fields
        if (!historyDay || !history || !hospitalId || !doctorId || !patientId) {
            return response.status(400).json({ error: 'Required fields are missing' });
        }

        // Create new history entry
        const newHistory = await prisma.history.create({
            data: {
                historyDay,
                history,
                hospital: { connect: { id: parseInt(hospitalId) } },
                doctor: { connect: { id: parseInt(doctorId) } },
                patient: { connect: { id: parseInt(patientId) } }
            }
        });

        return response.status(200).json(newHistory);
    } catch (error: any) {
        console.error('Error creating history entry:', error);
        return response.status(500).json({ error: 'Error creating history entry', details: error.message });
    }
}
