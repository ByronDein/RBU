import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDevelopers } from '@/hooks/use-developers';
import AssignProjectModal from '@/components/developers/AssignProjectModal';
import type { Developer } from '@/types/developer.types';

const DeveloperDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { developers, loading, error, fetchDevelopers, getAllProjectsByDeveloper } = useDevelopers();

    const [developer, setDeveloper] = useState<Developer | null>(null);
    const [projectsByDeveloper, setProjectsByDeveloper] = useState<any[]>([]);
    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        if (id && developers.length > 0) {
            fetchProjectsByDeveloper(Number(id));
            const foundDeveloper = developers.find(dev => dev.codigoDesarrollador === Number(id));
            setDeveloper(foundDeveloper || null);

        }
    }, [id, developers]);

    const handleAssignSuccess = () => {
        fetchDevelopers();
        setShowAssignModal(false);
    };

    const fetchProjectsByDeveloper = async (developerId: number) => {
        try {
            const response = await getAllProjectsByDeveloper(developerId);
            setProjectsByDeveloper(response);
            return response;
        } catch (error) {
            console.error('Error fetching projects for developer:', error);
        }

    }


    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Cargando desarrollador...</div>
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

    if (!developer) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Desarrollador no encontrado</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    size="sm"
                    onClick={() => navigate('/developers')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Button>
                <h1 className="text-2xl font-bold">Detalles del Desarrollador</h1>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{developer.nombre}</CardTitle>
                        <div className="flex gap-2">
                            <Badge variant={developer.registroActivo ? 'default' : 'secondary'}>
                                {developer.registroActivo ? 'Activo' : 'Inactivo'}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">RUT</h3>
                            <p className="text-base">{developer.rut}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Correo Electrónico</h3>
                            <p className="text-base">{developer.correoElectronico}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Fecha de Contratación</h3>
                            <p className="text-base">{new Date(developer.fechaContratacion).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Años de Experiencia</h3>
                            <p className="text-base">{developer.aniosExperiencia} años</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Proyectos Asignados</CardTitle>
                        <Button
                            onClick={() => setShowAssignModal(true)}
                            className="flex items-center gap-2"
                        >
                            <UserPlus className="h-4 w-4" />
                            Asignar Proyecto
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                   {projectsByDeveloper.length === 0 ? (
                        <p className="text-muted-foreground">No hay proyectos asignados a este desarrollador.</p>
                    ) : (   
                        <div className="space-y-3">
                            {projectsByDeveloper.map((project) => (
                                <Card key={project.codigoProyecto} className="transition-colors hover:bg-muted/50">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-base">{project.nombre}</h4>
                                                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                                                    <p>
                                                        <strong>Inicio:</strong> {new Date(project.fechaInicio).toLocaleDateString()}
                                                    </p>
                                                    <p>
                                                        <strong>Término:</strong> {new Date(project.fechaTermino).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge

                                                    variant={project.registroActivo ? 'default' : 'secondary'}
                                                    className="mt-2"
                                                >
                                                    {project.registroActivo ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                    
                </CardContent>
            </Card>

            <div className="flex gap-2">
                <Button
                    onClick={() => navigate(`/developers/${developer.codigoDesarrollador}/edit`)}
                    className="flex items-center gap-2"
                >
                    <Edit className="h-4 w-4" />
                    Editar Desarrollador
                </Button>
            </div>

            <AssignProjectModal
                developer={developer}
                isOpen={showAssignModal}
                onClose={() => setShowAssignModal(false)}
                onSuccess={handleAssignSuccess}
            />
        </div>
    );
};

export default DeveloperDetail;
