import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { formatLocalDate } from "@/lib/utils";
import { useProjects } from "@/hooks/use-project";
import { useNavigate } from "react-router-dom";
import { Delete, Edit, FolderCheck, Plus, Shield } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react";
import { projectService } from "@/services/project.service";
import ProjectFiltersComponent from "./ProjectFilters";
import ProjectCard from "./ProjectCard";
import type { ProjectFilters } from "./ProjectFilters";


const ProjectList = () => {
    const navigate = useNavigate();
    const { projects, loading, error, deleteProject, reactivateProject } = useProjects();
    
    const [developerCounts, setDeveloperCounts] = useState<Record<number, number>>({});
    const [loadingCounts, setLoadingCounts] = useState(false);

    const loadDeveloperCounts = async () => {
        if (projects.length === 0) return;
        
        try {
            setLoadingCounts(true);
            
            const countPromises = projects.map(async (project) => {
                try {
                    const developers = await projectService.getDevelopersByProject(project.codigoProyecto);
                    return { projectId: project.codigoProyecto, count: developers.length };
                } catch (error) {
                    console.error(`Error getting developers for project ${project.codigoProyecto}:`, error);
                    return { projectId: project.codigoProyecto, count: 0 };
                }
            });

            const counts = await Promise.all(countPromises);
            
            const countsMap = counts.reduce((acc, { projectId, count }) => {
                acc[projectId] = count;
                return acc;
            }, {} as Record<number, number>);
            
            setDeveloperCounts(countsMap);
        } catch (error) {
            console.error('Error loading developer counts:', error);
        } finally {
            setLoadingCounts(false);
        }
    };

    // Cargar conteos cuando cambien los proyectos
    useEffect(() => {
        loadDeveloperCounts();
    }, [projects]);

    // Estado para filtros
    const [filters, setFilters] = useState<ProjectFilters>({
        searchName: "",
        startDateFrom: "",
        startDateTo: "",
        endDateFrom: "",
        endDateTo: "",
        status: "all",
        developersMin: null,
        developersMax: null,
    });

    // Función para limpiar filtros
    const clearFilters = () => {
        setFilters({
            searchName: "",
            startDateFrom: "",
            startDateTo: "",
            endDateFrom: "",
            endDateTo: "",
            status: "all",
            developersMin: null,
            developersMax: null,
        });
    };

    // Función para filtrar proyectos
    const filteredProjects = projects.filter((project) => {
        // Filtro por nombre
        if (filters.searchName && !project.nombre.toLowerCase().includes(filters.searchName.toLowerCase())) {
            return false;
        }

        // Filtro por fecha de inicio
        if (filters.startDateFrom && project.fechaInicio < filters.startDateFrom) {
            return false;
        }
        if (filters.startDateTo && project.fechaInicio > filters.startDateTo) {
            return false;
        }

        // Filtro por fecha de término
        if (filters.endDateFrom && project.fechaTermino < filters.endDateFrom) {
            return false;
        }
        if (filters.endDateTo && project.fechaTermino > filters.endDateTo) {
            return false;
        }

        // Filtro por estado
        if (filters.status === "active" && !project.registroActivo) {
            return false;
        }
        if (filters.status === "inactive" && project.registroActivo) {
            return false;
        }

        // Filtro por desarrolladores asignados
        const developerCount = developerCounts[project.codigoProyecto] || 0;
        if (filters.developersMin !== null && developerCount < filters.developersMin) {
            return false;
        }
        if (filters.developersMax !== null && developerCount > filters.developersMax) {
            return false;
        }

        return true;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Cargando proyectos...</div>
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

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold">Lista de proyectos</h1>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate('/projects/create')}
                    className="flex items-center gap-2 w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    Agregar Proyecto
                </Button>
            </div>

            <ProjectFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
            />

            {/* Vista móvil - Cards */}
            <div className="block md:hidden">
                <div className="grid gap-4">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.codigoProyecto}
                                project={project}
                                developerCount={developerCounts[project.codigoProyecto] || 0}
                                loadingCount={loadingCounts}
                                onEdit={(id) => navigate(`/projects/${id}/edit`)}
                                onViewDetails={(id) => navigate(`/projects/${id}/detail`)}
                                onDelete={deleteProject}
                                onReactivate={reactivateProject}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            {projects.length === 0 
                                ? "No se encontraron proyectos." 
                                : "No se encontraron proyectos que coincidan con los filtros seleccionados."
                            }
                        </div>
                    )}
                </div>
            </div>

            {/* Vista desktop - Tabla */}
            <div className="hidden md:block overflow-x-auto">
                <Table className="w-full">
                    <TableCaption>Proyectos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del proyecto</TableHead>
                            <TableHead>Fecha de inicio</TableHead>
                            <TableHead>Fecha de término</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-center">Desarrolladores</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <TableRow key={project.codigoProyecto}>
                                    <TableCell className="font-medium">{project.nombre}</TableCell>
                                    <TableCell>{formatLocalDate(project.fechaInicio)}</TableCell>
                                    <TableCell>{formatLocalDate(project.fechaTermino)}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${project.registroActivo
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                            {project.registroActivo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {loadingCounts ? (
                                            <span className="text-muted-foreground">...</span>
                                        ) : (
                                            <span className="font-medium">
                                                {developerCounts[project.codigoProyecto] || 0}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="default">Acciones</Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="start">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem
                                                            onClick={() => navigate(`/projects/${project.codigoProyecto}/edit`)}
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => navigate(`/projects/${project.codigoProyecto}/detail`)}
                                                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-950"
                                                        >
                                                            <FolderCheck className="mr-2 h-4 w-4" />
                                                            Ver Detalles
                                                        </DropdownMenuItem>
                                                      
                                                        <DropdownMenuSeparator />

                                                        {project.registroActivo ? (
                                                            <DropdownMenuItem
                                                                onClick={() => deleteProject(project.codigoProyecto)}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                            >
                                                                <Delete className="mr-2 h-4 w-4" />
                                                                Eliminar
                                                            </DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem
                                                                onClick={() => reactivateProject(project.codigoProyecto)}
                                                                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                                                            >
                                                                <Shield className="mr-2 h-4 w-4" />
                                                                Reactivar
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    {projects.length === 0 
                                        ? "No se encontraron proyectos." 
                                        : "No se encontraron proyectos que coincidan con los filtros seleccionados."
                                    }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ProjectList