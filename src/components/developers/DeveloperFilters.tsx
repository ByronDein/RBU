import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

export interface DeveloperFilters {
    searchName: string;
    experienceMin: number | null;
    experienceMax: number | null;
    status: "all" | "active" | "inactive";
    projectsMin: number | null;
    projectsMax: number | null;
}

interface DeveloperFiltersProps {
    filters: DeveloperFilters;
    onFiltersChange: (filters: DeveloperFilters) => void;
    onClearFilters: () => void;
}

const DeveloperFiltersComponent = ({ filters, onFiltersChange, onClearFilters }: DeveloperFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const updateFilter = (key: keyof DeveloperFilters, value: any) => {
        const newFilters = {
            ...filters,
            [key]: value
        };

        if (key === "experienceMin") {
            if (newFilters.experienceMax !== null && value !== null && value > newFilters.experienceMax) {
                newFilters.experienceMax = null;
            }
        }

        if (key === "projectsMin") {
            if (newFilters.projectsMax !== null && value !== null && value > newFilters.projectsMax) {
                newFilters.projectsMax = null;
            }
        }

        onFiltersChange(newFilters);
    };

    const hasActiveFilters = () => {
        return filters.searchName ||
            filters.experienceMin !== null ||
            filters.experienceMax !== null ||
            filters.status !== "all" ||
            filters.projectsMin !== null ||
            filters.projectsMax !== null;
    };

    return (
        <Card className="mb-4">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Filter className="h-5 w-5 flex-shrink-0" />
                            <span className="truncate">Filtros de Desarrolladores</span>
                        </CardTitle>
                        {hasActiveFilters() && (
                            <Badge className="mt-1 w-fit">
                                Filtros activos
                            </Badge>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                        {hasActiveFilters() && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={onClearFilters}
                                className="w-full sm:w-auto"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Limpiar
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full sm:w-auto"
                        >
                            {isExpanded ? "Ocultar" : "Mostrar"} Filtros
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="space-y-4">
                    {/* Búsqueda por nombre */}
                    <div className="space-y-2">
                        <Label htmlFor="search-name">Buscar por nombre</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search-name"
                                placeholder="Buscar desarrollador por nombre..."
                                value={filters.searchName}
                                onChange={(e) => updateFilter("searchName", e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Filtros en grid responsivo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Años de experiencia */}
                        <div className="space-y-2">
                            <Label>Años de experiencia</Label>
                            <div className="space-y-2">
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Mínimo</Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={filters.experienceMin ?? ""}
                                        onChange={(e) => updateFilter("experienceMin", e.target.value ? Number(e.target.value) : null)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Máximo</Label>
                                    <Input
                                        type="number"
                                        placeholder="99"
                                        min={filters.experienceMin || 0}
                                        value={filters.experienceMax ?? ""}
                                        onChange={(e) => updateFilter("experienceMax", e.target.value ? Number(e.target.value) : null)}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="space-y-2">
                            <Label>Estado</Label>
                            <select
                                value={filters.status}
                                onChange={(e) => updateFilter("status", e.target.value as "all" | "active" | "inactive")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="all">Todos</option>
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                        </div>

                        {/* Proyectos asignados */}
                        <div className="space-y-2">
                            <Label>Proyectos asignados</Label>
                            <div className="space-y-2">
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Mínimo</Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={filters.projectsMin ?? ""}
                                        onChange={(e) => updateFilter("projectsMin", e.target.value ? Number(e.target.value) : null)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Máximo</Label>
                                    <Input
                                        type="number"
                                        placeholder="99"
                                        min={filters.projectsMin || 0}
                                        value={filters.projectsMax ?? ""}
                                        onChange={(e) => updateFilter("projectsMax", e.target.value ? Number(e.target.value) : null)}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default DeveloperFiltersComponent;
