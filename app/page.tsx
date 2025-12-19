import Link from 'next/link';
import { CarIcon } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (

    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-center relative overflow-hidden pt-16">

      <Navbar />

      {/* CAPA DE IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-[url('/city-bg.jpg.avif')] bg-cover bg-center opacity-30"
      >
      </div>

      {/* Contenido de la Página Centrado */}
      <div className="relative z-10 p-8 flex-grow flex flex-col justify-center w-full max-w-4xl">

        {/* Ícono de la App */}
        <div className="mx-auto w-24 h-24 flex items-center justify-center bg-blue-600 rounded-full mb-8 shadow-2xl">
          <CarIcon className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>

        {/* Título y Subtítulo */}
        <h1 className="text-5xl font-extrabold text-white mb-3">
          Bienvenido a app movil
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Tu plataforma de gestión de movilidad.
        </p>

        {/* Botones de Acción */}
        <div className="flex space-x-6 justify-center">
          <Link href="/login"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Iniciar Sesión
          </Link>
          <Link href="/register"
            className="px-8 py-4 border-2 border-blue-600 text-blue-300 text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            Registrarse
          </Link>
        </div>
      </div>

    </div>
  );
}