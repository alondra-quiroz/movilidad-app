// app/api/events/route.ts (Creación de Eventos)

import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { Role } from '@prisma/client'; // Importamos el enum Role

// --- ⚠️ SIMULACIÓN DE AUTENTICACIÓN ADMIN ⚠️ ---
// ESTA FUNCIÓN DEBE SER REEMPLAZADA POR TU LÓGICA REAL DE JWT/SESIÓN 
// QUE EXTRAE EL ROL Y EL ID DEL USUARIO DEL TOKEN ENVIADO EN EL HEADER.
async function getAdminInfo(request: Request): Promise<{ isAdmin: boolean, userId: string }> {
    // Por ahora, BUSCA UN USUARIO ADMIN DE PRUEBA EN TU DB para simular
    // Después del registro, puedes usar el email de tu primer admin creado
    const adminEmail = "admin@example.com";

    const user = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (user && user.role === Role.ADMIN) {
        return {
            isAdmin: true,
            userId: user.id
        };
    }

    return {
        isAdmin: false,
        userId: ''
    };
}
// ------------------------------------------------------------------

export async function POST(request: Request) {
    // 1. Verificar Permisos de Administración
    const { isAdmin, userId } = await getAdminInfo(request);

    if (!isAdmin) {
        return NextResponse.json(
            { error: 'Acceso denegado. Solo los administradores pueden crear eventos.' },
            { status: 403 } // Forbidden
        );
    }

    try {
        const body = await request.json();
        const {
            title,
            description,
            date,
            location,
            seatPriceCents // Precio por asiento (oculto al usuario final)
        } = body;

        // 2. Validación de Campos Mínima
        if (!title || !description || !date || !location) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios del evento.' },
                { status: 400 }
            );
        }

        // 3. Creación del Evento
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                // Aseguramos que la fecha sea un objeto Date válido
                date: new Date(date),
                location,
                creatorId: userId, // Asignar el creador (el admin verificado)
                // Almacena el precio de la movilidad definido por el admin
                seatPriceCents: seatPriceCents || 0,
            }
        });

        return NextResponse.json(
            {
                message: 'Evento creado exitosamente.',
                event: newEvent
            },
            { status: 201 } // Created
        );

    } catch (error) {
        console.error('Error al crear evento:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor al crear el evento.' },
            { status: 500 }
        );
    }
}