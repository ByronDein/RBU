import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Calendar,
    Award,
    Briefcase,
    MoreVertical,
    Edit,
    FolderCheck,
    Folder,
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
import type { Developer } from "@/types/developer.types";

interface DeveloperCardProps {
    developer: Developer;
    projectCount: number;
    loadingCount: boolean;
    onEdit: (id: number) => void;
    onViewDetails: (id: number) => void;
    onAssignProject: (developer: Developer) => void;
    onDelete: (id: number) => void;
    onReactivate: (id: number) => void;
}

const DeveloperCard = ({
    developer,
    projectCount,
    loadingCount,
    onEdit,
    onViewDetails,
    onAssignProject,
    onDelete,
    onReactivate
}: DeveloperCardProps) => {
    return (
        <Card className="w-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">

                        <div>
                            <h3 className="font-semibold text-lg text-start">{developer.nombre}</h3>
                            <p className="text-sm text-muted-foreground text-start">RUT: {developer.rut}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={developer.registroActivo ? "default" : "secondary"}>
                            {developer.registroActivo ? 'Activo' : 'Inactivo'}
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
                                    <DropdownMenuItem onClick={() => onEdit(developer.codigoDesarrollador)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onViewDetails(developer.codigoDesarrollador)}
                                    >
                                        <FolderCheck className="mr-2 h-4 w-4" />
                                        Ver Detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        disabled={!developer.registroActivo}
                                        onClick={() => onAssignProject(developer)}
                                    >
                                        <Folder className="mr-2 h-4 w-4" />
                                        {developer.registroActivo ? 'Asignar Proyecto' : 'Usuario inactivo'}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {developer.registroActivo ? (
                                        <DropdownMenuItem
                                            onClick={() => onDelete(developer.codigoDesarrollador)}
                                            className="text-red-600"
                                        >
                                            <Delete className="mr-2 h-4 w-4" />
                                            Eliminar
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem
                                            onClick={() => onReactivate(developer.codigoDesarrollador)}
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
                    {/* Email */}
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{developer.correoElectronico}</span>
                    </div>

                    {/* Fecha de contratación */}
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Contratado: {new Date(developer.fechaContratacion).toLocaleDateString('es-ES')}</span>
                    </div>

                    {/* Experiencia y proyectos */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span>{developer.aniosExperiencia} años exp.</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {loadingCount ? '...' : projectCount} proyecto{projectCount !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DeveloperCard;
