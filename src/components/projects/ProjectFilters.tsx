import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Calendar } from "lucide-react";

export interface ProjectFilters {
    searchName: string;
    startDateFrom: string;
    startDateTo: string;
    endDateFrom: string;
    endDateTo: string;
    status: "all" | "active" | "inactive";
    developersMin: number | null;
    developersMax: number | null;
}

interface ProjectFiltersProps {
    filters: ProjectFilters;
    onFiltersChange: (filters: ProjectFilters) => void;
    onClearFilters: () => void;
}

const ProjectFiltersComponent = ({ filters, onFiltersChange, onClearFilters }: ProjectFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const updateFilter = (key: keyof ProjectFilters, value: any) => {
        const newFilters = {
            ...filters,
            [key]: value
        };

        if (key === "startDateFrom") {
            if (newFilters.startDateTo && value && value > newFilters.startDateTo) {
                newFilters.startDateTo = "";
            }
        }

        if (key === "endDateFrom") {
            if (newFilters.endDateTo && value && value > newFilters.endDateTo) {
                newFilters.endDateTo = "";
            }
        }

        if (key === "developersMin") {
            if (newFilters.developersMax !== null && value !== null && value > newFilters.developersMax) {
                newFilters.developersMax = null;
            }
        }

        onFiltersChange(newFilters);
    };

    const hasActiveFilters = () => {
        return filters.searchName ||
            filters.startDateFrom ||
            filters.startDateTo ||
            filters.endDateFrom ||
            filters.endDateTo ||
            filters.status !== "all" ||
            filters.developersMin !== null ||
            filters.developersMax !== null;
    };

    return (
        <Card className="mb-4">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Filter className="h-5 w-5 flex-shrink-0" />
                            <span className="truncate">Filtros de Proyectos</span>
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
                                placeholder="Buscar proyecto por nombre..."
                                value={filters.searchName}
                                onChange={(e) => updateFilter("searchName", e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Filtros en grid responsivo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Fecha de inicio */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Fecha de inicio
                            </Label>
                            <div className="space-y-2">
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Desde</Label>
                                    <Input
                                        type="date"
                                        className='w-full [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                        value={filters.startDateFrom}
                                        onChange={(e) => updateFilter("startDateFrom", e.target.value)}
                                    />
                                </div>
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Hasta</Label>
                                    <Input
                                        type="date"
                                        className='w-full [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                        min={filters.startDateFrom || undefined}
                                        value={filters.startDateTo}
                                        onChange={(e) => updateFilter("startDateTo", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Fecha de término */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Fecha de término
                            </Label>
                            <div className="space-y-2">
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Desde</Label>
                                    <Input
                                        type="date"
                                        className='w-full [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                        value={filters.endDateFrom}
                                        onChange={(e) => updateFilter("endDateFrom", e.target.value)}
                                    />
                                </div>
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Hasta</Label>
                                    <Input
                                        type="date"
                                        className='w-full [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                        min={filters.endDateFrom || undefined}
                                        value={filters.endDateTo}
                                        onChange={(e) => updateFilter("endDateTo", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="space-y-1">
                            <Label>Estados</Label>
                            <Label className="text-xs text-muted-foreground">estado</Label>
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

                        {/* Desarrolladores asignados */}
                        <div className="space-y-2">
                            <Label>Desarrolladores asignados</Label>
                            <div className="space-y-2">
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Mínimo</Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={filters.developersMin ?? ""}
                                        onChange={(e) => updateFilter("developersMin", e.target.value ? Number(e.target.value) : null)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Label className="text-xs text-muted-foreground">Máximo</Label>
                                    <Input
                                        type="number"
                                        placeholder="99"
                                        min={filters.developersMin || 0}
                                        value={filters.developersMax ?? ""}
                                        onChange={(e) => updateFilter("developersMax", e.target.value ? Number(e.target.value) : null)}
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

export default ProjectFiltersComponent;
