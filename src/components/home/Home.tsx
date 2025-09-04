import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FolderOpen, Calendar, BarChart3 } from 'lucide-react'

const Home = () => {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                    Bienvenido al Sistema de Mantenimiento
                </h1>
                <p className="text-lg text-gray-600">
                    Gestión de Desarrolladores y Proyectos
                </p>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Gestiona tu equipo de desarrollo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        Este sistema te permite administrar de manera eficiente tu equipo de desarrolladores
                        y los proyectos en los que trabajan. Mantén un control completo sobre la información
                        de tu equipo  y los proyectos.
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Desarrolladores
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Gestiona la información de tu equipo: datos personales, experiencia,
                            fecha de contratación y estado activo.
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FolderOpen className="h-5 w-5 text-green-600" />
                            Proyectos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Administra proyectos, fechas de inicio y fin, estados,
                            y asigna desarrolladores a cada proyecto.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Funcionalidades principales
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Desarrolladores</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Crear y editar desarrolladores</li>
                                <li>• Activar/Desactivar desarrolladores</li>
                                <li>• Filtrar por experiencia y estado</li>
                                <li>• Ver detalles completos</li>
                                <li>• Asignar proyectos</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Proyectos</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Crear y editar proyectos</li>
                                <li>• Gestionar proyectos activos</li>
                                <li>• Activar/Desactivar proyectos</li>
                                <li>• Filtrar por estado y fechas</li>
                                <li>• Ver detalles de cada proyecto y sus desarrolladores</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home