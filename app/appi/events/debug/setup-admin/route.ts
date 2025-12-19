import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const admin = await prisma.user.upsert({
            where: { email: "admin@test.com" },
            update: {},
            create: {
                email: "admin@test.com",
                password: "password123",
                name: "Administrador",
                role: "ADMIN",
            },
        });
        return NextResponse.json({ message: "Admin creado con éxito", admin });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}