'use client';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
    // 1. Definición de todos los enlaces y submenús
    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Nosotros', href: '/about' },
        { name: 'Servicios', href: '/services' },
        { name: 'Contáctanos', href: '/contact' },
        {
            name: 'Evento',
            isDropdown: true,
            subLinks: [
                { name: 'Crear Evento', href: '/admin/create-event' }, // RUTA SOLO PARA ADMIN
                { name: 'Participar de Evento', href: '/events' },      // RUTA PÚBLICA
            ],
        },
    ];

    return (
        <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Contenedor principal de la barra de navegación: h-16 (altura) */}
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex-shrink-0 text-2xl font-bold text-blue-400">
                        Movilidad App
                    </Link>

                    <div className="flex space-x-6">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group flex items-center h-16"> {/* Añadir h-16 y items-center al contenedor del enlace */}
                                {link.isDropdown ? (
                                    // Si es un Dropdown
                                    <>
                                        {/* AJUSTE CLAVE: h-16 para que ocupe la altura completa y se centre */}
                                        <button className="flex items-center h-16 text-white hover:text-blue-400 px-3 py-2 text-md font-medium transition duration-150">
                                            {link.name}
                                            <ChevronDown className="w-4 h-4 ml-1" />
                                        </button>

                                        {/* El menú desplegable se mantiene pegado abajo (mt-0) */}
                                        <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block transition duration-200 z-50">
                                            {link.subLinks.map((subLink) => (
                                                <Link
                                                    key={subLink.name}
                                                    href={subLink.href}
                                                    className="block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-white"
                                                >
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link href={link.href} className="flex items-center h-16 text-white hover:text-blue-400 px-3 py-2 text-md font-medium transition duration-150">
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <Link href="/login"
                        className="px-4 py-2 border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-blue-400 hover:text-white transition duration-200"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </nav>
    );
}