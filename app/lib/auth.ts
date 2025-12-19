// lib/auth.ts
'use server';
import prisma from './prisma';
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function registerUser(name: string, email: string, passwordPlain: string) {
    // 1. LIMPIEZA Y VALIDACIÓN (Mejora)
    const cleanEmail = email.trim().toLowerCase();

    // 2. VERIFICAR DUPLICADOS (Mejora importante)
    const existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
    });

    if (existingUser) {
        throw new Error('Este correo electrónico ya está en uso.');
    }

    // 3. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(passwordPlain, SALT_ROUNDS);

    // 4. Crear el usuario
    return await prisma.user.create({
        data: {
            name: name.trim(),
            email: cleanEmail,
            password: hashedPassword,
            role: 'PARTICIPANT',
        },
    });
}

export async function loginUser(email: string, passwordPlain: string) {
    const cleanEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: { email: cleanEmail },
    });

    if (!user) {
        throw new Error('El correo electrónico no está registrado.');
    }

    const isPasswordValid = await bcrypt.compare(passwordPlain, user.password);

    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta.');
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}