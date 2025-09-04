import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Users, Briefcase } from "lucide-react";
import { projectService } from "@/services/project.service";
import type { Project } from "@/types/project.types";
import type { Developer } from "@/types/developer.types";

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadProjectDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                // Cargar proyecto y desarrolladores en paralelo
                const [projectData, developersData] = await Promise.all([
                    projectService.getProjectById(Number(id)),
                    projectService.getDevelopersByProject(Number(id))
                ]);

                setProject(projectData);
                setDevelopers(developersData);
            } catch (err) {
                console.error('Error loading project details:', err);
                setError('Error al cargar los detalles del proyecto');
            } finally {
                setLoading(false);
            }
        };

        loadProjectDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Cargando detalles del proyecto...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Proyecto no encontrado</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header con botón de regreso */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link to="/projects">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Proyectos
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">{project.nombre}</h1>
                    <p className="text-muted-foreground">Detalles del proyecto</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Información del Proyecto */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Información del Proyecto
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Código de Proyecto</label>
                            <p className="text-lg">{project.codigoProyecto}</p>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Nombre de Proyecto</label>
                            <p className="text-lg">{project.nombre}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Fecha de Inicio</label>
                            <p className="text-sm flex items-center justify-center gap-2">
                                <Calendar className="h-4 w-4 " />
                                {new Date(project.fechaInicio).toLocaleDateString('es-ES')}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Fecha de Término</label>
                            <p className="text-sm flex items-center justify-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(project.fechaTermino).toLocaleDateString('es-ES')}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Estado</label>
                            <div className="mt-1">
                                <Badge variant={project.registroActivo ? "default" : "secondary"}>
                                    {project.registroActivo ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Desarrolladores Asignados */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Desarrolladores Asignados
                            <Badge variant="outline" className="ml-auto">
                                {developers.length}
                            </Badge>
                        </CardTitle>
                        <CardDescription>
                            Lista de desarrolladores trabajando en este proyecto
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {developers.length === 0 ? (
                            <div className="text-center py-4 text-muted-foreground">
                                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>No hay desarrolladores asignados a este proyecto</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {developers.map((developer) => (
                                    <div 
                                        key={developer.codigoDesarrollador} 
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {developer.nombre}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {developer.correoElectronico}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={developer.registroActivo ? "default" : "secondary"}>
                                                {developer.registroActivo ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                asChild
                                            >
                                                <Link to={`/developers/${developer.codigoDesarrollador}/detail`}>
                                                    Ver Detalle
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Acciones */}
            <div className="flex gap-4">
                <Button asChild variant={"outline"}>
                    <Link to={`/projects/${project.codigoProyecto}/edit`}>
                        Editar Proyecto
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to="/projects">
                        Volver a la Lista
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default ProjectDetail;
