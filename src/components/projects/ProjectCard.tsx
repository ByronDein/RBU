import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatLocalDate } from "@/lib/utils";
import { 
    Calendar, 
    CalendarDays,
    Users, 
    MoreVertical,
    Edit,
    FolderCheck,
    Delete,
    Shield
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/types/project.types";

interface ProjectCardProps {
    project: Project;
    developerCount: number;
    loadingCount: boolean;
    onEdit: (id: number) => void;
    onViewDetails: (id: number) => void;
    onDelete: (id: number) => void;
    onReactivate: (id: number) => void;
}

const ProjectCard = ({
    project,
    developerCount,
    loadingCount,
    onEdit,
    onViewDetails,
    onDelete,
    onReactivate
}: ProjectCardProps) => {
    return (
        <Card className="w-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="font-semibold text-lg text-start">{project.nombre}</h3>
                            <p className="text-sm text-muted-foreground text-start">Código: {project.codigoProyecto}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={project.registroActivo ? "default" : "secondary"}>
                            {project.registroActivo ? 'Activo' : 'Inactivo'}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => onEdit(project.codigoProyecto)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onViewDetails(project.codigoProyecto)}>
                                        <FolderCheck className="mr-2 h-4 w-4" />
                                        Ver Detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {project.registroActivo ? (
                                        <DropdownMenuItem 
                                            onClick={() => onDelete(project.codigoProyecto)}
                                            className="text-red-600"
                                        >
                                            <Delete className="mr-2 h-4 w-4" />
                                            Eliminar
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem 
                                            onClick={() => onReactivate(project.codigoProyecto)}
                                            className="text-green-600"
                                        >
                                            <Shield className="mr-2 h-4 w-4" />
                                            Reactivar
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-3">
                    {/* Fecha de inicio */}
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Inicio: {formatLocalDate(project.fechaInicio)}</span>
                    </div>
                    
                    {/* Fecha de término */}
                    <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Término: {formatLocalDate(project.fechaTermino)}</span>
                    </div>
                    
                    {/* Desarrolladores asignados */}
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {loadingCount ? '...' : developerCount} desarrollador{developerCount !== 1 ? 'es' : ''}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
