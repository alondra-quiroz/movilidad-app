'use server';

import { loginUser } from './auth';
import { redirect } from 'next/navigation';

export async function loginUsuario(formData: FormData) {
    // Extraemos los datos del formulario
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        throw new Error("Por favor, completa todos los campos.");
    }

    try {
        // Llamamos a la función de tu archivo auth.ts
        const user = await loginUser(email, password);

        // Si llegamos aquí, los datos son correctos.
        console.log("Sesión iniciada para:", user.email);

        // Nota: Aquí falta la lógica de sesión (Cookies/JWT), 
        // pero esto quitará el error de importación.
    } catch (error: any) {
        // Re-lanzamos el error para que el componente lo maneje
        throw new Error(error.message);
    }

    // Redirigimos al usuario después de un login exitoso
    redirect('/dashboard');
}