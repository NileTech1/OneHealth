import { PrismaClient } from '@prisma/client';

async function main() {
    const prisma = new PrismaClient(); // Initialize PrismaClient instance
    try {
        // Attempt to connect to the database
        await prisma.$connect();
        console.log("Database connection successful!");

        // Optionally, run a simple query to test the connection further
        const users = await prisma.user.findMany();
        console.log("Retrieved users:", users);
    } catch (error) {
        console.error("Database operation failed:", error);
    } finally {
        // Ensure to disconnect from the database after the operation, regardless of success or failure
        await prisma.$disconnect();
        console.log("Database connection closed.");
    }
}

main();
