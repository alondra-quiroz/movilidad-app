"use client"

import { loginUsuario } from "../lib/actions";

export default function LoginPage() {
    return (
        // Añadimos bg-slate-950 para el fondo oscuro de toda la pantalla
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a]">
            <div className="p-8 bg-[#1e293b] rounded-lg shadow-xl w-full max-w-md border border-slate-800">
                <h1 className="text-2xl font-bold mb-6 text-white text-center">Iniciar Sesión</h1>

                <form action={loginUsuario} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            required
                            className="w-full p-2.5 rounded bg-slate-700/50 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            className="w-full p-2.5 rounded bg-slate-700/50 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded transition-colors mt-4"
                    >
                        Entrar
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿No tienes cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
                </p>
            </div>
        </div>
    );
}