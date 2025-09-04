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
import { useDevelopers } from "@/hooks/use-developers";
import { useNavigate } from "react-router-dom";
import { Delete, Edit, Folder, FolderCheck, Plus, Shield } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AssignProjectModal from "./AssignProjectModal";
import DeveloperFiltersComponent from "./DeveloperFilters";
import DeveloperCard from "./DeveloperCard";
import type { Developer } from "@/types/developer.types";
import type { DeveloperFilters } from "./DeveloperFilters";
import { useState, useEffect } from "react";
import { developerService } from "@/services/developer.service";


const DeveloperList = () => {
    const navigate = useNavigate();
    const { developers, deleteDeveloper, reactivateDeveloper, loading, error, fetchDevelopers } = useDevelopers();

    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const [projectCounts, setProjectCounts] = useState<Record<number, number>>({});
    const [loadingCounts, setLoadingCounts] = useState(false);

    const loadProjectCounts = async () => {
        if (developers.length === 0) return;

        try {
            setLoadingCounts(true);

            const countPromises = developers.map(async (developer) => {
                try {
                    const projects = await developerService.getAllProjectsByDeveloper(developer.codigoDesarrollador);
                    return { developerId: developer.codigoDesarrollador, count: projects.length };
                } catch (error) {
                    console.error(`Error getting projects for developer ${developer.codigoDesarrollador}:`, error);
                    return { developerId: developer.codigoDesarrollador, count: 0 };
                }
            });

            const counts = await Promise.all(countPromises);

            const countsMap = counts.reduce((acc, { developerId, count }) => {
                acc[developerId] = count;
                return acc;
            }, {} as Record<number, number>);

            setProjectCounts(countsMap);
        } catch (error) {
            console.error('Error loading project counts:', error);
        } finally {
            setLoadingCounts(false);
        }
    };

    // Cargar conteos cuando cambien los desarrolladores
    useEffect(() => {
        loadProjectCounts();
    }, [developers]);

    // Estado para filtros
    const [filters, setFilters] = useState<DeveloperFilters>({
        searchName: "",
        experienceMin: null,
        experienceMax: null,
        status: "all",
        projectsMin: null,
        projectsMax: null,
    });

    // Función para limpiar filtros
    const clearFilters = () => {
        setFilters({
            searchName: "",
            experienceMin: null,
            experienceMax: null,
            status: "all",
            projectsMin: null,
            projectsMax: null,
        });
    };

    // Función para filtrar desarrolladores
    const filteredDevelopers = developers.filter((dev) => {
        // Filtro por nombre
        if (filters.searchName && !dev.nombre.toLowerCase().includes(filters.searchName.toLowerCase())) {
            return false;
        }

        // Filtro por experiencia
        if (filters.experienceMin !== null && dev.aniosExperiencia < filters.experienceMin) {
            return false;
        }
        if (filters.experienceMax !== null && dev.aniosExperiencia > filters.experienceMax) {
            return false;
        }

        // Filtro por estado
        if (filters.status === "active" && !dev.registroActivo) {
            return false;
        }
        if (filters.status === "inactive" && dev.registroActivo) {
            return false;
        }

        // Filtro por proyectos asignados
        const projectCount = projectCounts[dev.codigoDesarrollador] || 0;
        if (filters.projectsMin !== null && projectCount < filters.projectsMin) {
            return false;
        }
        if (filters.projectsMax !== null && projectCount > filters.projectsMax) {
            return false;
        }

        return true;
    });

    const handleAssignProject = (developer: Developer) => {
        setSelectedDeveloper(developer);
        setShowAssignModal(true);
    };

    const handleAssignSuccess = () => {
        fetchDevelopers(); 
        loadProjectCounts(); 
        setShowAssignModal(false);
        setSelectedDeveloper(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Cargando desarrolladores...</div>
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
                <h1 className="text-2xl font-bold">Lista de desarrolladores</h1>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate('/developers/create')}
                    className="flex items-center gap-2 w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    Agregar Desarrollador
                </Button>
            </div>

            {/* Componente de filtros */}
            <DeveloperFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
            />

            {/* Vista móvil - Cards */}
            <div className="block md:hidden">
                <div className="grid gap-4">
                    {filteredDevelopers.length > 0 ? (
                        filteredDevelopers.map((dev) => (
                            <DeveloperCard
                                key={dev.codigoDesarrollador}
                                developer={dev}
                                projectCount={projectCounts[dev.codigoDesarrollador] || 0}
                                loadingCount={loadingCounts}
                                onEdit={(id) => navigate(`/developers/${id}/edit`)}
                                onViewDetails={(id) => navigate(`/developers/${id}/detail`)}
                                onAssignProject={handleAssignProject}
                                onDelete={deleteDeveloper}
                                onReactivate={reactivateDeveloper}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            {developers.length === 0 
                                ? "No se encontraron desarrolladores." 
                                : "No se encontraron desarrolladores que coincidan con los filtros seleccionados."
                            }
                        </div>
                    )}
                </div>
            </div>

            {/* Vista desktop - Tabla */}
            <div className="hidden md:block overflow-x-auto">
                <Table className="w-full">
                    <TableCaption>Desarrolladores</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre Completo</TableHead>
                            <TableHead>RUT</TableHead>
                            <TableHead>Correo Electrónico</TableHead>
                            <TableHead>Fecha Contratación</TableHead>
                            <TableHead>Años Experiencia</TableHead>
                            <TableHead>Proyectos Asignados</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDevelopers.length > 0 ? (
                            filteredDevelopers.map((dev) => (
                                <TableRow key={dev.codigoDesarrollador}>
                                    <TableCell className="font-medium">{dev.nombre}</TableCell>
                                    <TableCell>{dev.rut}</TableCell>
                                    <TableCell>{dev.correoElectronico}</TableCell>
                                    <TableCell>{new Date(dev.fechaContratacion).toLocaleDateString()}</TableCell>
                                    <TableCell>{dev.aniosExperiencia} años</TableCell>
                                    <TableCell className="text-center">
                                        {loadingCounts ? (
                                            <span className="text-muted-foreground">...</span>
                                        ) : (
                                            <span className="font-medium">
                                                {projectCounts[dev.codigoDesarrollador] || 0}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${dev.registroActivo
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                            {dev.registroActivo ? 'Activo' : 'Inactivo'}
                                        </span>
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
                                                            onClick={() => navigate(`/developers/${dev.codigoDesarrollador}/edit`)}
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => navigate(`/developers/${dev.codigoDesarrollador}/detail`)}
                                                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-950"
                                                        >
                                                            <FolderCheck className="mr-2 h-4 w-4" />
                                                            Ver Detalles
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => handleAssignProject(dev)}
                                                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950"
                                                        >
                                                            <Folder className="mr-2 h-4 w-4" />
                                                            Asignar Proyecto
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />

                                                        {dev.registroActivo ? (
                                                            <DropdownMenuItem
                                                                onClick={() => deleteDeveloper(dev.codigoDesarrollador)}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                            >
                                                                <Delete className="mr-2 h-4 w-4" />
                                                                Eliminar
                                                            </DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem
                                                                onClick={() => reactivateDeveloper(dev.codigoDesarrollador)}
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
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    {developers.length === 0 
                                        ? "No se encontraron desarrolladores." 
                                        : "No se encontraron desarrolladores que coincidan con los filtros seleccionados."
                                    }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {selectedDeveloper && (
                <AssignProjectModal
                    developer={selectedDeveloper}
                    isOpen={showAssignModal}
                    onClose={() => setShowAssignModal(false)}
                    onSuccess={handleAssignSuccess}
                />
            )}
        </div>
    )
}

export default DeveloperList