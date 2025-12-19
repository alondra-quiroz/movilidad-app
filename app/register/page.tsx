'use client';

import { useState } from 'react';
import { registerUser } from '@/lib/auth';
import Link from 'next/link';

export default function RegisterPage() {
    // 1. Estado unificado para el formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { name, email, password } = formData;

        // 2. Validaciones básicas antes de enviar
        if (!name.trim() || !email.trim() || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setIsLoading(true); // Iniciar estado de carga

        try {
            // 3. Enviamos los datos limpios (trim)
            await registerUser(name.trim(), email.trim().toLowerCase(), password);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Error al registrar usuario.');
        } finally {
            setIsLoading(false); // Finalizar estado de carga
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Registro de Usuarios</h1>

                {success ? (
                    <div className="text-center space-y-4 animate-fade-in">
                        <div className="bg-green-900/20 p-4 rounded-lg">
                            <p className="text-green-400 font-medium">¡Usuario registrado con éxito!</p>
                        </div>
                        <Link
                            href="/login"
                            className="block w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
                        >
                            Ir al inicio de sesión
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="text-red-400 text-sm bg-red-900/30 p-3 rounded border border-red-500/50">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Nombre</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                placeholder="Tu nombre"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Correo electrónico</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                placeholder="correo@ejemplo.com"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Contraseña</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-bold py-2 rounded transition duration-200 flex justify-center items-center ${isLoading
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                    Registrando...
                                </>
                            ) : (
                                'Registrarse'
                            )}
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-gray-400 text-sm">
                    ¿Ya tienes una cuenta? <Link href="/login" className="text-blue-400 hover:underline">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}