// pages/api/patient/register.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { patientId, } = req.body;

        // Check if the patientId is provided
        if (!patientId) {
            return res.status(400).json({ error: 'patientId is required' });
        }

        // Create a new patient
        const newPatient = await prisma.patient.create({
            data: {
                patientId,
            },
        });

        res.status(201).json(newPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the patient' });
    }
}
