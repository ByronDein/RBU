import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/use-project';
import { useDevelopers } from '@/hooks/use-developers';
import { toast } from 'sonner';
import type { Developer } from '@/types/developer.types';
import type { Project } from '@/types/project.types';

interface AssignProjectModalProps {
    developer: Developer;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const AssignProjectModal: React.FC<AssignProjectModalProps> = ({
    developer,
    isOpen,
    onClose,
    onSuccess
}) => {
    const { projects, loading: projectsLoading } = useProjects();
    const { assignDeveloperToProject, unassignDeveloperFromProject, getAllProjectsByDeveloper } = useDevelopers();
    const [assigning, setAssigning] = useState<number | null>(null);
    const [unassigning, setUnassigning] = useState<number | null>(null);
    const [assignedProjects, setAssignedProjects] = useState<Project[]>([]);
    const [loadingAssigned, setLoadingAssigned] = useState<boolean>(false);

    // Cargar proyectos asignados al desarrollador
    useEffect(() => {
        if (isOpen && developer) {
            loadAssignedProjects();
        }
    }, [isOpen, developer]);

    const loadAssignedProjects = async () => {
        try {
            setLoadingAssigned(true);
            const assigned = await getAllProjectsByDeveloper(developer.codigoDesarrollador);
            setAssignedProjects(assigned);
        } catch (error) {
            console.error('Error loading assigned projects:', error);
            setAssignedProjects([]);
        } finally {
            setLoadingAssigned(false);
        }
    };

    // Función para verificar si un proyecto está asignado
    const isProjectAssigned = (projectId: number) => {
        return assignedProjects.some(assigned => assigned.codigoProyecto === projectId);
    };

    // Filtrar solo proyectos activos
    const activeProjects = projects.filter(project => project.registroActivo);

    const handleAssign = async (projectId: number) => {
        try {
            setAssigning(projectId);
            const project = projects.find(p => p.codigoProyecto === projectId);
            await assignDeveloperToProject(developer.codigoDesarrollador, projectId);

            toast.success(`${developer.nombre} asignado al proyecto "${project?.nombre}" con éxito`);

            await loadAssignedProjects();
            onSuccess?.();
        } catch (error) {
            console.error('Error assigning project:', error);
            toast.error('Error al asignar el proyecto');
        } finally {
            setAssigning(null);
        }
    };

    const handleUnassign = async (projectId: number) => {
        try {
            setUnassigning(projectId);
            const project = projects.find(p => p.codigoProyecto === projectId);
            await unassignDeveloperFromProject(developer.codigoDesarrollador, projectId);

            toast.success(`${developer.nombre} desasignado del proyecto "${project?.nombre}" con éxito`);

            await loadAssignedProjects();
            onSuccess?.();
        } catch (error) {
            console.error('Error unassigning project:', error);
            toast.error('Error al desasignar el proyecto');
        } finally {
            setUnassigning(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="!max-w-none !w-[90vw] md:!w-[60vw]  max-h-[80vh] overflow-y-auto"
                style={{ maxWidth: '60vw', width: '60vw' }}
            >
                <DialogHeader>
                    <DialogTitle>Gestionar Proyectos</DialogTitle>
                    <DialogDescription>
                        Asigna o desasigna proyectos para <strong>{developer.nombre}</strong>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Información del desarrollador */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Desarrollador</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{developer.nombre}</p>
                                    <p className="text-sm text-muted-foreground">{developer.correoElectronico}</p>
                                    <p className="text-sm text-muted-foreground">{developer.aniosExperiencia} años de experiencia</p>
                                </div>
                                <Badge variant={developer.registroActivo ? 'default' : 'secondary'}>
                                    {developer.registroActivo ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lista única de proyectos */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Proyectos</h3>

                        {projectsLoading || loadingAssigned ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Cargando proyectos...
                            </div>
                        ) : activeProjects.length > 0 ? (
                            <div className="space-y-3 max-h-72 overflow-y-auto">
                                {activeProjects.map((project) => {
                                    const isAssigned = isProjectAssigned(project.codigoProyecto);
                                    const isLoading = assigning === project.codigoProyecto || unassigning === project.codigoProyecto;

                                    return (
                                        <Card
                                            key={project.codigoProyecto}
                                            className={`transition-colors hover:bg-muted/50 ${isAssigned ? 'border-blue-200 bg-blue-50/30' : ''}`}
                                        >
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
                                                            variant={isAssigned ? 'default' : 'secondary'}
                                                            className={`mt-2 ${isAssigned ? 'bg-blue-100 text-blue-800' : ''}`}
                                                        >
                                                            {isAssigned ? 'Asignado' : 'Disponible'}
                                                        </Badge>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant={isAssigned ? 'destructive' : 'default'}
                                                        onClick={() => isAssigned ? handleUnassign(project.codigoProyecto) : handleAssign(project.codigoProyecto)}
                                                        disabled={isLoading}
                                                        className="ml-4"
                                                    >
                                                        {isLoading
                                                            ? (isAssigned ? 'Desasignando...' : 'Asignando...')
                                                            : (isAssigned ? 'Desasignar' : 'Asignar')
                                                        }
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-8 text-muted-foreground">
                                    No hay proyectos activos disponibles.
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Botón cerrar */}
                    <div className="flex justify-end pt-4 border-t">
                        <Button onClick={onClose}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AssignProjectModal;
