import Link from 'next/link';
// Importa el tipo LucideIcon de la librería para definir la propiedad 'Icon'
import { LucideIcon, Sailboat, Mountain, Bike, Map, Calendar } from 'lucide-react';
// !!! RUTA CRÍTICA !!!: Ajusta esta línea si tu estructura es diferente. 
import Navbar from '../../components/Navbar.js';

// 1. DEFINE LA INTERFAZ (TYPESCRIPT)
// Esta interfaz elimina las líneas onduladas rojas del editor de código.
interface ServiceCardProps {
    Icon: LucideIcon; // Indica que Icon es un componente Lucide (un icono)
    title: string;
    description: string;
    link: string;
}

// 2. APLICA LA INTERFAZ AL COMPONENTE ServiceCard
const ServiceCard = ({ Icon, title, description, link }: ServiceCardProps) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col items-start transition duration-300 hover:bg-gray-700 h-full">
        <Icon className="w-10 h-10 text-blue-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <Link href={link} className="text-blue-400 font-semibold hover:text-blue-300 transition duration-150">
            Ver Detalles →
        </Link>
    </div>
);

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-center relative pt-16">

            <Navbar />

            {/* Contenido centrado de la página Servicios */}
            <div className="max-w-7xl mx-auto py-16 px-4">

                {/* Encabezado Principal */}
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    Nuestras Aventuras Extremas
                </h1>
                <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
                    Ofrecemos experiencias únicas con el equipo más seguro y guías expertos. Elige tu siguiente desafío.
                </p>

                {/* Grid de Servicios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">

                    <ServiceCard
                        Icon={Mountain}
                        title="Trekking y Escalada"
                        description="Explora las cimas más desafiantes. Rutas guiadas, alquiler de equipo profesional y seguridad garantizada."
                        link="/services/trekking"
                    />
                    <ServiceCard
                        Icon={Bike}
                        title="Ciclismo de Montaña"
                        description="Recorridos épicos por senderos vírgenes. Desde niveles principiantes hasta descensos para expertos."
                        link="/services/cycling"
                    />
                    <ServiceCard
                        Icon={Sailboat}
                        title="Deportes Acuáticos"
                        description="Aprende windsurf, kitesurf y kayak en los mejores spots. Cursos intensivos para todos los niveles."
                        link="/services/aquatic"
                    />
                    <ServiceCard
                        Icon={Map}
                        title="Rutas de Aventura GPS"
                        description="Acceso a nuestra biblioteca de rutas verificadas y descarga de mapas offline para explorar por tu cuenta."
                        link="/services/routes"
                    />
                    <ServiceCard
                        Icon={Calendar}
                        title="Eventos y Competencias"
                        description="Inscríbete en los eventos de deporte extremo más grandes del país. Gestión completa de participación."
                        link="/services/events"
                    />

                </div>

                {/* Call to Action Secundario */}
                <div className="mt-20 bg-blue-600 p-10 rounded-xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        ¡Tu adrenalina te espera!
                    </h2>
                    <Link href="/register"
                        className="inline-block px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
                    >
                        Regístrate Ahora
                    </Link>
                </div>

            </div>

        </div>
    );
}